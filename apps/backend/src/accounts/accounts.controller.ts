import { Body, Controller, Post } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { LoginDto, RegisterDto } from './accounts.dto'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.accountsService.login(dto)
  }

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.accountsService.register(dto)
  }
}
