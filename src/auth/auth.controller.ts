import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constans';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthResponseErrorDto,
  AuthResponseSuccessDto,
} from './dto/auth.responce.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiParam({
    name: 'login',
    type: 'string',
    required: true,
    description: 'Валидный email',
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    description: 'пароль не менее 3х символов',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: AuthResponseSuccessDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Bad Request',
    type: AuthResponseErrorDto,
  })
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);
    if (oldUser) {
      throw new NotFoundException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
