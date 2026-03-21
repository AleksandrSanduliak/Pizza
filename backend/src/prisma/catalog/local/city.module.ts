import { Module } from '@nestjs/common';
import { CityService } from 'src/city/city.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
