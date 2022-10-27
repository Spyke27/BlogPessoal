import { IsNumber, IsString } from "class-validator";

export class CreatePostagemDto {
    @IsNumber()
    id: number;

    @IsString()
    title:string;

    @IsString()
    text:string;

    @IsString()
    date: string;
}
