 import { IsNotEmpty } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
 import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


 @Entity ({name: "tb_categorias"})
 export class Categoria {
    @PrimaryGeneratedColumn ()
    id: number

    @IsNotEmpty ()
    @Column ({length: 255, nullable: false})
    genero:string

    @OneToMany (() => Produto, (produto) => produto.categoria)
    produto: Produto
 }