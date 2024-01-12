import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }
  
  @Post('/signin')
  signIn(@Body() authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }
}
