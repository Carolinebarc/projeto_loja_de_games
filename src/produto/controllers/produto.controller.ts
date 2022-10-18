import { Controller, Get, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { Body, Delete, Param, Post, Put } from "@nestjs/common/decorators";
import {Produto} from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";


@Controller ("/produto")
export class ProdutoController {
    constructor (private readonly produtoService: ProdutoService) {}


    @Get ()
    @HttpCode(HttpStatus.OK)
    findAll (): Promise<Produto[]> {
        return this.produtoService.findAll (); 
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }
    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name:string): Promise<Produto[]>{
        return this.produtoService.findByName(name);
    }
    @Post ()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto)
    }
    @Put ()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto:Produto): Promise<Produto>{
        return this.produtoService.update(produto);
        
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number) {
        return this.produtoService.delete(id);
    }
}