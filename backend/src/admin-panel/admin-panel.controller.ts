import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { AdminPanelService } from './admin-panel.service';
@Controller('api/v1/admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) { }

  @Get('getGlobalProducts')
  getGlobalProducs(res) {

    return this.adminPanelService.getGlobalProducs();
  }

  @Get('getGlobalProduct/:category/:id')
  getGlobalProduct(@Param('category') category: string, @Param('id', ParseIntPipe) id: number,) {
    // console.log('category', category)
    // console.log('id', id, typeof id)

    return this.adminPanelService.getGlobalProduct({ category, id });
  }
  @Post('createGlobalProduct')
  createGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    // console.log('data', req, res);

    return this.adminPanelService.createGlobalProduct({ data: req });
  }
  @Post('updateGlobalProduct')
  updateGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.adminPanelService.updateGlobalProduct({ data: req });
  }
  @Delete('deleteGlobalProduct')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteGlobalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    // console.log('data', req, res);
    return this.adminPanelService.deleteGlobalProduct({ data: req });
  }

  @Post('createCategory')
  createCategory(@Body() req, @Res({ passthrough: true }) res: Response) {
    // console.log('data', req, res);
    return this.adminPanelService.createGlobalCategory({ data: req });
  }

  @Post('createLocalCategory')
  createLocalCategory(@Body() req, @Res({ passthrough: true }) res: Response) {
    // console.log('data', req, res);
    return this.adminPanelService.createLocalCategory({ data: req });
  }
  @Post('createLocalProduct')
  createLocalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    // console.log('data', req, res);
    return this.adminPanelService.createLocalProduct({ data: req });
  }

  @Delete('deleteLocalProduct')
  deleteLocalProduct(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.adminPanelService.deleteLocalProduct({ data: req });
  }

  @Get('getGlobalCategories')
  async getGlobalCategories(@Res() res: Response) {
    const { totalCount, globalCategories } = await this.adminPanelService.getGlobalCategories();
    // console.log('totalCount, globalCategories', totalCount, globalCategories)
    // res.header('X-Total-Count', totalCount);
    // headers('X-Total-Count', totalCount)
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.setHeader('X-Total-Count', totalCount.toString());
    return res.json(globalCategories);
  }
  @Get('getCategory/:category')
  getCategory(@Param('category') category: string) {
    return this.adminPanelService.getCategory(category);
  }

  @Get('getCitiesList')
  getCitiesList() {
    return this.adminPanelService.getCitiesList();
  }
  @Get('getCity/:city')
  getCity(@Param('city') city: string) {
    return this.adminPanelService.getCity(city);
  }

  @Post('createCity')
  createCity(@Body() req, @Res({ passthrough: true }) res: Response) {
    return this.adminPanelService.createCity({ data: req });
  }
}
