import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
  }
}
