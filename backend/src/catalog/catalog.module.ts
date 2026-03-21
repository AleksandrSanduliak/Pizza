import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GlobalProductController } from 'src/catalog/global-product.controller';
import { GlobalProductService } from 'src/catalog/global-product.service';
import { LocalProductService } from 'src/catalog/local-catalogs.service';
import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { LocalProductController } from 'src/catalog/local-catalogs.controller';

@Module({
  controllers: [GlobalProductController, LocalProductController],
  providers: [
    LocalProductService,
    GlobalProductService,
    PrismaService,
    PrismaAdapter,
  ],
})
export class CatalogModule {}
