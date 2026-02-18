import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  providers: [PrismaService, CityService],
  controllers: [CityController],
})
export class CityModule {}
