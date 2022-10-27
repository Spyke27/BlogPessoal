import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm"

@Entity({name: "tb_postagens"})
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable:false})
    title: string;

    @IsNotEmpty()
    @Column({length: 1000, nullable:false})
    text: string;

    @UpdateDateColumn()
    date: Date;

    @ManyToOne(()=> Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ManyToOne(()=> Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
