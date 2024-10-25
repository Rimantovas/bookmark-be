import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(Auth0Strategy.name);

  constructor(private configService: ConfigService) {
    const domain = configService.get<string>('AUTH0_DOMAIN');
    const audience = configService.get<string>('AUTH0_AUDIENCE');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domain}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: audience,
      issuer: `${domain}`,
      algorithms: ['RS256'],
    });

    this.logger.log(
      `Auth0Strategy initialized with domain: ${domain} and audience: ${audience}`,
    );
  }

  async validate(payload: any) {
    this.logger.log('Auth0Strategy: validate called', payload);
    return payload; // Return the full payload
  }
}
