import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { cookieSettings } from './cookieSettings';
import { UserDTO } from './dto/user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() req: UserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register({ data: req });

    const clientUrl = this.configService.get<string>('CLIENT_URL');
    console.log('clientUrl', clientUrl);
    res.cookie('refreshToken', user.tokens.refreshToken, cookieSettings);

    return user;
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() req: Request, @Res({ passthrough: true }) res: Response) {
    // console.log('req', req);
    const user = await this.authService.login({ data: req });
    res.cookie('refreshToken', user.tokens.refreshToken, cookieSettings);
    // console.log('user', user);
    return user;
  }
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.refresh({ data: req.cookies });
    res.cookie('refreshToken', user.tokens.refreshToken, cookieSettings);
    return user;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout({ data: req.cookies });
  }
}
