import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { DeleteResult, ILike, Repository } from "typeorm";
import {Produto} from "../entities/produto.entity"


@Injectable ()
export class ProdutoService {
    constructor (
        @InjectRepository (Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) {} 

    async findAll (): Promise <Produto[]> {
        return await this.produtoRepository.find ();
        
    }
    async findById(id: number): Promise<Produto>{
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            }, 
            relations: {
                usuario: true 
            }
        });
        if (!produto)
        throw new HttpException('Produto não Encontrado!', HttpStatus.NOT_FOUND);
        return produto;
    }
    async findByName(name: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                name: ILike(`%${name}%`)
            }
        })
    }
    async create(produto: Produto): Promise<Produto> {

        if (produto.categoria) {
            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

            return await this.produtoRepository.save(produto); 
        }
        return await this.produtoRepository.save(produto);
    }
    async update(produto: Produto): Promise<Produto> {
        let buscaProduto: Produto = await this.findById(produto.id);
        
    if (!buscaProduto || !produto.id)
    throw new HttpException ('Produto não Encontrado!', HttpStatus.NOT_FOUND);

    return await this.produtoRepository.save(produto);
    }
    async delete(id:number): Promise<DeleteResult> {
        let buscaProduto = await this.findById(id);

        if (!buscaProduto)
        throw new HttpException('Produto não Encontrado', HttpStatus.NOT_FOUND);
        
        return await this.produtoRepository.delete(id);
    }
}