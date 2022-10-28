import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm"

@Entity({name: "tb_postagens"})
export class Postagem {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable:false})
    @ApiProperty() 
    title: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable:false})
    @ApiProperty() 
    text: string;

    @UpdateDateColumn()
    @ApiProperty() 
    date: Date;

    @ApiProperty({type: ()=> Tema}) 
    @ManyToOne(()=> Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({type: ()=> Usuario}) 
    @ManyToOne(()=> Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
