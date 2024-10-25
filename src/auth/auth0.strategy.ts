import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../shared/enums/user-role.enum';

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

    // Assuming the role is stored in the 'app_metadata.role' field of the token
    // Adjust this according to where the role is actually stored in your token
    const role = payload.app_metadata?.role;

    // if (!role) {
    //   throw new UnauthorizedException('No role found in token');
    // }

    // // Validate that the role is a valid UserRole
    // if (!Object.values(UserRole).includes(role)) {
    //   throw new UnauthorizedException('Invalid role');
    // }

    // Return an object with the necessary user information
    return {
      userId: payload.sub,
      email: payload.email,
      role: (role as UserRole) || UserRole.REGULAR,
      // Include any other relevant user information from the payload
    };
  }
}
