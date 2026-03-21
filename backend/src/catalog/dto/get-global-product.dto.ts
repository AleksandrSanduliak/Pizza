import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetGlobalProductDTO {
  @IsNotEmpty()
  @IsString()
  category: string

  @IsNotEmpty()
  @IsNumber()
  id: number
}