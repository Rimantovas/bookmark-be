import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  color: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  icon?: string;
}
