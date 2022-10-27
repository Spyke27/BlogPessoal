import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "db_blogpessoal",
      entities: [Postagem, Tema, Usuario],
      synchronize:true
    }), 
    PostagemModule, TemaModule, UsuarioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
