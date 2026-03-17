import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { capitalizeFirstLetter } from 'src/shared/utils/capitalize-first-letter';

export class CreateGlobalCategoyDTO {
  @Type(() => String)
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Минимум 3 символа в ключе категории (category)',
  })
  @Matches(/^[a-z]+$/i, {
    message: 'Только латинские буквы в ключе категории (category)',
  })
  readonly category: string;

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => capitalizeFirstLetter(value))
  @MinLength(3, {
    message: 'Минимум 3 символа в названии категории (categoryTitle)',
  })
  @Matches(/^[а-я]+$/i, {
    message: 'Только русские буквы в названии категории (categoryTitle)',
  })
  readonly categoryTitle: string;
}
