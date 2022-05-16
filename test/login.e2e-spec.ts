import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { PASSWORD_LENGTH_ERROR } from '../src/auth/auth.constans';

const loginDto: AuthDto = {
  login: 'test@test.ru',
  password: '12345',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        const access_token = body.access_token;
        expect(access_token).toBeDefined();
        expect(loginDto.login).toBe(body.email);
      });
  });

  it('/auth/login (POST) - fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '12345678' })
      .expect(401, {
        statusCode: 401,
        message: 'Не правильный пароль',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail password, {message: PASSWORD_LENGTH_ERROR}', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '1' })
      .expect(400, {
        statusCode: 400,
        message: ['Минимальная длина пароля 3 символа'],
        error: 'Bad Request',
      });
  });

  it('/auth/login (POST) - fail email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'ass@ass.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь с таким email не найден',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
