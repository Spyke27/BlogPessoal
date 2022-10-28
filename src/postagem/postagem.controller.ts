import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { HttpStatus } from '@nestjs/common/enums';
import { Postagem } from './entities/postagem.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Postagem')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
    return this.postagemService.findById(id);
  }
@Get('/title/:title')
@HttpCode(HttpStatus.OK)
findByTitle(@Param('title') title: string): Promise<Postagem[]>{
  return this.postagemService.findByTitle(title);
}
@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body()Postagem: Postagem): Promise<Postagem>{
  return this.postagemService.create(Postagem)
}
@Put()
@HttpCode(HttpStatus.OK)
update(@Body()postagem: Postagem): Promise<Postagem>{
  return this.postagemService.update(postagem);
}
@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number){
  return this.postagemService.delete(id);
}
}
