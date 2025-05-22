import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
}
