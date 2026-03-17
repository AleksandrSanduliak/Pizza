import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalProductService } from 'src/admin-panel/local-product.service';

@Controller('api/v1/local-product')
export class LocalProductController {
  constructor(private readonly localProductService: LocalProductService) {}

  @Post('createLocalCategory')
  createLocalCategory(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.localProductService.createLocalCategory({ data: req });
  }
  @Post('createLocalProduct')
  createLocalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.localProductService.createLocalProduct({ data: req });
  }

  @Delete('deleteLocalProduct')
  deleteLocalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.localProductService.deleteLocalProduct({ data: req });
  }

  @Get('getCitiesList')
  getCitiesList() {
    return this.localProductService.getCitiesList();
  }
  @Get('getCity/:city')
  getCity(@Param('city') city: string) {
    return this.localProductService.getCity(city);
  }

  @Post('createCity')
  createCity(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.localProductService.createCity({ data: req });
  }
}
