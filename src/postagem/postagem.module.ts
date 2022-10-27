import { Module } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { PostagemController } from './postagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { TemaModule } from 'src/tema/tema.module';
import { TemaService } from 'src/tema/tema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  controllers: [PostagemController],
  providers: [PostagemService, TemaService],
  exports: [TypeOrmModule]
})
export class PostagemModule {}
