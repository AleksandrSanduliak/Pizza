import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('api/v1/city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get('cityList')
  async getCityList() {
    const cityList = await this.cityService.cityList();
    console.log('cityList', cityList);
    return cityList;
  }

  @Get('cityInfo')
  async getCityInfo() {
    const cityList = await this.cityService.cityList();
    console.log('cityList', cityList);
    return cityList;
  }

  // @Get('cityGoods')
  // async getCityInfo() {
  //   const cityList = await this.cityService.cityList();
  //   console.log('cityList', cityList);
  //   return cityList;
  // }
}
