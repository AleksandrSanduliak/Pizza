import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}
  async cityList() {
    console.log('123');
    return await this.prismaService.city.findMany({
      select: {
        city: true,
        name: true,
        url: true,
      },
    });
  }
}
