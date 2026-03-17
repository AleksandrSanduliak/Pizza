import { Module } from '@nestjs/common';
import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { PrismaService } from 'src/prisma/prisma.service';
import { GlobalProductController } from 'src/admin-panel/global-product.controller';
import { GlobalProductService } from 'src/admin-panel/global-product.service';
import { LocalProductController } from 'src/admin-panel/local-product.controller';
import { LocalProductService } from 'src/admin-panel/local-product.service';

@Module({
  controllers: [GlobalProductController],
  providers: [
    // LocalProductService,
    GlobalProductService,
    PrismaService,
    // PrismaAdapter,
  ],
})
export class CatalogModule {}
