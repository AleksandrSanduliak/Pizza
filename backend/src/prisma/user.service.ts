import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/generated/prisma/client';
import { PrismaService } from './prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    console.log('fdsfs');
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
