import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { $Enums as PrismaEnums } from '@prisma/generated/prisma/client';
import Redis from 'ioredis';
import { UserService } from 'src/prisma/user.service';
import { convertToIsoString } from 'src/shared/utils/date/convertDate';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from './dto/user.dto';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private passwordService: PasswordService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  async register({ data }: { data: UserDTO }) {
    console.log('data', data);
    const { email, password } = data;

    const user = await this.userService.user({ email });
    if (user)
      throw new BadRequestException(
        'Пользователь с таким email уже зарегестрирован',
        {
          cause: new Error(),
          description: 'Ошибка при создании пользователя',
        },
      );
    const salt = this.passwordService.getSalt();

    const hashPassword = this.passwordService.getHash(password, salt);
    console.log('salt', salt);
    console.log('hashPassword', hashPassword);
    const uuid = uuidv4();
    console.log('uuid', uuid);
    const userData: UserDTO = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: hashPassword,
      activationLink: uuid,
      bonuses: 0,
      isActivated: false,
      role: PrismaEnums.Roles.User,
      dateBirth: convertToIsoString(data.dateBirth),
      salt,
    };
    const createUser = await this.userService.createUser(userData);

    if (!createUser)
      throw new BadRequestException('Ошибка создания пользователя', {
        cause: new Error(),
        description: 'Ошибка при создании пользователя',
      });
    console.log('createUser', createUser);
    const tokens = await this.tokenService.generateTokens({ email });
    console.log('tokens', tokens);

    return {
      email: userData.email,
      name: userData.name,
      bonuses: userData.bonuses,
      tokens,
    };
  }

  async login({ data }) {
    console.log('data', data);
    const { email, password: inputPassword } = data;
    console.log('1');
    const user = await this.userService.user({ email });
    console.log('2');
    console.log('user', user);
    if (!user) throw new UnauthorizedException();
    const { password: dbPassword, salt } = user;
    const hash = this.passwordService.getHash(inputPassword, salt);
    console.log('hash', hash);
    if (hash !== dbPassword) throw new UnauthorizedException();
    const tokens = await this.tokenService.generateTokens({ email });
    await this.redis.set(email, JSON.stringify(tokens));
    return {
      email: user.email,
      name: user.name,
      bonuses: user.bonuses,
      tokens,
    };
  }

  async refresh({ data }) {
    console.log('data', data);
    const { refreshToken, accessToken } = data;
    if (!refreshToken) throw new UnauthorizedException();

    const isValidRefreshToken =
      await this.tokenService.validateRefreshToken(refreshToken);
    console.log('isValidRefreshToken', isValidRefreshToken);
    console.log(
      '!isValidRefreshToken || !isValidRefreshToken.email',
      !isValidRefreshToken || !isValidRefreshToken.email,
    );
    console.log('!isValidRefreshToken', !isValidRefreshToken);
    console.log(
      '!isValidRefreshToken.mail',
      !isValidRefreshToken.email,
      isValidRefreshToken.email,
    );
    if (!isValidRefreshToken || !isValidRefreshToken.email)
      throw new UnauthorizedException();
    const { email } = isValidRefreshToken;
    console.log('after throw error');
    const tokens = JSON.parse(await this.redis.get(email));
    if (!tokens) throw new UnauthorizedException();
    console.log('tokens', tokens);
    const generateTokens = await this.tokenService.generateTokens({
      email: isValidRefreshToken.email,
    });
    await this.redis.set(
      isValidRefreshToken.email,
      JSON.stringify(generateTokens),
    );
    const userData = await this.userService.findUserByEmail(
      isValidRefreshToken.email,
    );
    console.log('user refresh', userData);
    return {
      email: isValidRefreshToken.email,
      name: userData.name,
      bonuses: userData.bonuses,
      tokens,
    };
  }

  async logout({ data }) {
    console.log(data);
    const { refreshToken } = data;
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    await this.redis.del(userData.email);
  }
}
