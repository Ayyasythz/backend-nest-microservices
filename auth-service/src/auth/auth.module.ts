import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { AuthController } from './auth.controller';
import { AuthGrpcController } from './auth-grpc.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d'
        }
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController,AuthGrpcController],
  providers: [AuthService]
})
export class AuthModule {}
