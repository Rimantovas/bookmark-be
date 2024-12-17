import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class ChangeRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
