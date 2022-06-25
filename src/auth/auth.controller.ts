import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiOkResponse({
    description: 'Новый пользователь зарегистрирован',
  })
  @ApiNotFoundResponse({
    description: 'Ошибка регистрации пользователя',
  })
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new NotFoundException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiOkResponse({
    description: 'Авторизация прошла успешно',
  })
  @ApiUnauthorizedResponse({
    description: 'Не правильный логин или пароль',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
