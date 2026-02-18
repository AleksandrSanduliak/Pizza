import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { configuration } from './config/configuration';
import { GoodsModule } from './goods/goods.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    AuthModule,
    RedisModule.forRoot({
      type: 'single',
      options: {
        host: 'redis',
        port: 6379,
        password: 'veryhardpassword',
        db: 0,
      },
    }),
    GoodsModule,
    CityModule,
    AdminPanelModule,
  ],
  controllers: [],
  // providers: [GoodsService1],
})
export class AppModule {}
