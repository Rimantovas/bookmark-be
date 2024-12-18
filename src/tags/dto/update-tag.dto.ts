import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @IsHexColor()
  @IsOptional()
  @ApiProperty({ required: false })
  color?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  icon?: string;
}
