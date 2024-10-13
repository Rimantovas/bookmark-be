import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  private?: boolean;
}
