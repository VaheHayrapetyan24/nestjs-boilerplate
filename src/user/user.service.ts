import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto';

@Injectable()
export class UserService extends BaseService<User> {
    constructor (
        @InjectRepository(User) readonly repo,
        @Inject('JwtService') private readonly jwtService: JwtService,
    ) {
        super(repo);
    }

    async findOneByEmail (email: string): Promise<User|null> {
        return this.findOne({ where: { email } });
    }

    async checkForExistingUserAndThrow (email: string): Promise<void> {
        const existingUser: User|null = await this.findOneByEmail(email);
        if (!existingUser) {
            return;
        }
        throw new HttpException('User with email already exists', HttpStatus.BAD_REQUEST);
    }

    async validateUser (email: string, password: string): Promise<User> {
        const user = await this.findOneOrThrow({ where: { email } });
        if (!user.comparePassword(password)) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    login (user: User): LoginResponseDto {
        const payload = { id: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
