import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller ("/categoria")
export class CategoriaController {
    constructor (private readonly categoriaService: CategoriaService) {}



    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():
    Promise<Categoria[]> {
        return this.categoriaService.findAll(); 

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findByID(@Param('id', ParseIntPipe)id: number): Promise<Categoria> {
        return this.categoriaService.findById(id); 

    }

    @Get('/genero/:genero')
    @HttpCode(HttpStatus.OK)
    findByGenero (@Param('genero') genero:string): Promise<Categoria[]> {
        return this.categoriaService.findByGenero(genero)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(Categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(Categoria);
}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.categoriaService.delete(id);
}

}