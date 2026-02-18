import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [],
  providers: [PrismaService, GoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
