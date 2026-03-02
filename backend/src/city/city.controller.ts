import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('cityInfo/:city')
  async getCityInfo(@Param('city') city: string) {
    const cityList = await this.cityService.cityInfo(city);
    console.log('cityList', cityList);
    return cityList;
  }

  @Get('cityCatalog/:city')
  async getCityCatalog(@Param('city') city: string) {
    const cityList = await this.cityService.cityCatalog(city);
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
