import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

const AUTH_USER = '__AUTH_USER__'

export type AuthUserType = { id: string }

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): AuthUserType =>
    ctx.switchToHttp().getRequest()[AUTH_USER]
)

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const [authType, token] = req.headers['authorization']?.split(' ') ?? []

    if (authType !== 'Bearer' || !token) throw new UnauthorizedException()

    const { id }: AuthUserType = await this.jwtService
      .verifyAsync(token)
      .catch(() => {
        throw new UnauthorizedException()
      })
    req[AUTH_USER] = { id }
    return true
  }
}
