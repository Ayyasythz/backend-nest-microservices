import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthGrpcController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'AuthenticateUser')
  async authenticateUser({email, password}){
    try {
      const result = await this.authService.login({email, password});
      console.log(result.token);
      return {success: true, token: result.token};
    }catch (error){
      return {success: false, error: error.message};
    }
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  async validateToken({token}){
    return this.authService.validateToken(token)
  }
}