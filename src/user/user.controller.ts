import {
    Controller,
    Inject,
    Post,
    Get,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpStatus, HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth, AuthUser } from '../decorators';
import { SignupDto, LoginDto, LoginResponseDto } from './dto';
import { User } from './user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor (@Inject('UserService') private readonly userService: UserService) { }

    @Post('signup')
    async signup (@Body() signupDto: SignupDto): Promise<void> {
        await this.userService.checkForExistingUserAndThrow(signupDto.email);
        await this.userService.createAndSave(signupDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login (@Body() { email, password }: LoginDto): Promise<LoginResponseDto> {
        const user = await this.userService.validateUser(email, password);
        return this.userService.login(user);
    }

    @Get('me')
    @Auth()
    getUser (@AuthUser() user: User): User {
        return user;
    }
}
