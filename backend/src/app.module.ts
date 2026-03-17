import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { configuration } from './config/configuration';
import { CatalogModule } from './admin-panel/catalog.module';

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
    CityModule,
    CatalogModule,
  ],
  controllers: [],
})
export class AppModule {}
