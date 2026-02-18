import { IsNotEmpty, IsString } from 'class-validator';

export class GoodsDTO {
  @IsString()
  @IsNotEmpty()
  location: string;
}
