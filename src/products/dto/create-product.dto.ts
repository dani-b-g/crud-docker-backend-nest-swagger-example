import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Portátil' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Portátil 16GB RAM' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 799.99 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  stock!: number;
}
