import { IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
