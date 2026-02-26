import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PassThrough } from 'stream';
import { GoodsService } from './goods.service';
@Controller('api/v1/goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}
  @Get(':city')
  async getGoods(
    @Param('city') city: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!city)
      throw new BadRequestException('Отсутствует локация', {
        cause: new Error(),
        description: 'Отсутствует локация',
      });
    const cityData = await this.goodsService.getGoods(city);
    if (!cityData)
      throw new BadRequestException('Отсутствует локация', {
        cause: new Error(),
        description: `Отсутствуют данные по городу ${city}`,
      });
    return cityData;
  }
}
