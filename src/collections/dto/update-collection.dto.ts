import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  private?: boolean;
}
