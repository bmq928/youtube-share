import { IsEmail, IsStrongPassword } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string
}

export class LoginDto extends RegisterDto {}
