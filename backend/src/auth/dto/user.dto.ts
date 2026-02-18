import { IsEmail, IsLowercase, IsNotEmpty } from 'class-validator';

import { $Enums as PrismaEnums } from '@prisma/generated/prisma/client';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  dateBirth: string;

  role: PrismaEnums.Roles;
  isActivated: boolean;
  bonuses: number;
  activationLink: string;
  salt: string;
}
