import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsDefined, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

export class BaseUserDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsString({ always: true })
    @MinLength(3, { always: true })
    username: string;

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
