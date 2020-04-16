import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user.service';
import { User } from '../user.entity';

interface IDecryptedJwt {
    id: number;
    iat: number;
    exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

     async validate ({ id, exp, iat }: IDecryptedJwt): Promise<User> {
         if (exp - iat <= 0) {
             throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
         }
         const user = await this.userService.findOne(id);
         if (!user) {
             throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
         }
         return user;
    }
}
