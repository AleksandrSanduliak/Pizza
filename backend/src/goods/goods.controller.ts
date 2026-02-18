import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PassThrough } from 'stream';
import { GoodsService } from './goods.service';
@Controller('api/v1/goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}
  @Get('getGoods')
  async getGoods(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('req, req', req.cookies);
    const cookie = req.cookies;
    if (!cookie?.location)
      throw new BadRequestException('Отсутствует локация', {
        cause: new Error(),
        description: 'Отсутствует локация',
      });
    return await this.goodsService.getGoods(cookie.location);
  }
}
