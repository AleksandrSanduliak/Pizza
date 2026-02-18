import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async generateTokens(payload) {
    console.log('payload', payload);
    const jwt = this.configService.get('jwt');
    console.log('jwt', jwt);
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwt.access.secret,
      expiresIn: jwt.access.expiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwt.refresh.secret,
      expiresIn: jwt.refresh.expiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validate(token, secret) {
    console.log(
      'this.jwtService.verifyAsync(token, { secret })',
      this.jwtService.verifyAsync(token, { secret }),
    );
    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async validateRefreshToken(token: string) {
    const refreshSecret = this.configService.get('jwt.refresh.secret');
    console.log('refreshSecret', refreshSecret);
    return await this.validate(token, refreshSecret);
  }
  async validateAccessToken(token, secret) {
    return await this.validate(token, secret);
  }
}
