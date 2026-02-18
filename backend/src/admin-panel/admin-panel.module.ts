import { Module } from '@nestjs/common';
import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPanelController } from './admin-panel.controller';
import { AdminPanelService } from './admin-panel.service';

@Module({
  controllers: [AdminPanelController],
  providers: [AdminPanelService, PrismaService, PrismaAdapter],
})
export class AdminPanelModule {}
