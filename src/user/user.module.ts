import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BaseService } from '../base/base.service';
import { User } from './user.entity';
import { jwtAuthParams } from '../../constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.register({
        secret: jwtAuthParams.SECRET,
        signOptions: { expiresIn: jwtAuthParams.EXPIRES_IN },
      }),
      // JwtStrategy,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, JwtStrategy],
})
export class UserModule { }
