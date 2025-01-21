import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from './entities/user.entitiy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto){
    const existingUser = await this.userRepository.findOne({
      where : {email: registerDto.email}
    })
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const user = this.userRepository.create(registerDto)
    await this.userRepository.save(user)

    const token = this.jwtService.sign({
      userId: user.id
    });

    return {token}
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    })

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({
      userId: user.id,
    });

    return {
      token
    }
  }

  async validateToken(token: string){
    try{
      const payload = this.jwtService.verify(token)
      const user = await this.userRepository.findOne({
        where : {id: payload.userId}
      })

      if (!user || !user.isActive){
        return {
          valid: false,
          errors: 'Invalid User'
        }
      }
      return {
        valid: true,
        userId : user.id
      }
    }catch (error){
      return {
        valid: false,
        errors: 'Invalid Token'
      }
    }
  }
}
