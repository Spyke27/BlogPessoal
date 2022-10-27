import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository} from "typeorm";
import { Bcrypt } from 'src/auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  usuarioService: any;
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ){}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations:{
        postagem: true
      }
    });
  }

  async findById (id: number): Promise<Usuario> {
    let usuario = await this.usuarioRepository.findOne({
        where:{
            id
        },
      relations:{
        postagem: true
      }
    });
    if (!usuario) {
      throw new HttpException('Usuario não encontrada!', HttpStatus.NOT_FOUND);
    }
      return usuario;
  }

  async findByUsuario(usuario: string): Promise<Usuario>{
    return await this.usuarioRepository.findOne({
        where:{
            usuario: usuario
        },
        relations:{
          postagem: true
        }
    })
  }


//Cadastrar usuario
  async create(usuario: Usuario): Promise<Usuario>{

    let buscaUsuario = await this.findByUsuario(usuario.usuario)

    if (!buscaUsuario){
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
    throw new HttpException('Este usuário já existe!', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario>{
    let updateUsuario = await this.findById(usuario.id);
    let buscaUsuario = await this.findByUsuario(usuario.usuario)

    if (!updateUsuario){
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
    }
    if (buscaUsuario && buscaUsuario.id !== usuario.id){
        throw new HttpException('Esse email já está cadastrado!', HttpStatus.BAD_REQUEST);
    }
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario)
  }
  
}


