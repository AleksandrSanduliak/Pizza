import { GlobalProductService } from './global-product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateGlobalCategoyDTO } from 'src/admin-panel/dto/global-product/create-category.dto';

@Controller('api/v1/global-product')
export class GlobalProductController {
  constructor(private readonly globalProductService: GlobalProductService) {}

  @Get('getGlobalProducts')
  getGlobalProducs(res) {
    return this.globalProductService.getGlobalProducs();
  }

  @Get('getGlobalProduct/:category/:id')
  getGlobalProduct(
    @Param('category') category: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.globalProductService.getGlobalProduct({ category, id });
  }
  @Post('createGlobalProduct')
  createGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.globalProductService.createGlobalProduct({ data: req });
  }
  @Post('updateGlobalProduct')
  updateGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.globalProductService.updateGlobalProduct({ data: req });
  }
  @Delete('deleteGlobalProduct')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.globalProductService.deleteGlobalProduct({ data: req });
  }

  @Post('createGlobalCategory')
  createCategory(
    @Body() categoryData: CreateGlobalCategoyDTO,
    // @Res({ passthrough: true }) res: Response,
  ) {
    console.log('categoryData', categoryData);
    return this.globalProductService.createGlobalCategory({ categoryData });
  }

  @Get('getGlobalCategories')
  async getGlobalCategories(@Res() res: Response) {
    const { totalCount, globalCategories } =
      await this.globalProductService.getGlobalCategories();
    // console.log('totalCount, globalCategories', totalCount, globalCategories)
    // res.header('X-Total-Count', totalCount);
    // headers('X-Total-Count', totalCount)
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', totalCount.toString());
    return res.json(globalCategories);
  }
  @Get('getCategory/:category')
  getCategory(@Param('category') category: string) {
    return this.globalProductService.getCategory(category);
  }
}
