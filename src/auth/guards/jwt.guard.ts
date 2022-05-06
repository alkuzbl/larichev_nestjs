import { AuthGuard } from '@nestjs/passport';

export class JwrAuthGuard extends AuthGuard('jwt') {}
