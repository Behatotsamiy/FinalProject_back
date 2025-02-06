import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    @MinLength(6)
    @MaxLength(6)
    password: string;

    @IsString()
    role: string;
}
