import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class LoginDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined({ always: true })
    @IsString({ always: true })
    @MinLength(8, { always: true })
    @Exclude({ toPlainOnly: true })
    password: string;
}
