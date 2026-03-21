import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCitiesList() {
    const getCitiesList = await this.prismaService.city.findMany();
    return getCitiesList;
  }

  async createCity({ data }: { data: Prisma.CityCreateInput }) {
    const createCity = await this.prismaService.city.create({
      data: data,
    });
    return createCity;
  }
}
