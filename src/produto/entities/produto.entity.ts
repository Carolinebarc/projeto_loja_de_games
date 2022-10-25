import {IsNotEmpty} from "class-validator"
import { Usuario } from "src/usuario/entites/usuario.entity"
import { Categoria } from "src/categoria/entities/categoria.entity"
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"


@Entity ({name: 'tb_produto'})
export class Produto {

    @PrimaryGeneratedColumn ()
    id: number
    
    @IsNotEmpty ()
    @Column ({length: 80, nullable: false})
    name: string
    
    @IsNotEmpty ()
    @Column ('decimal', {precision: 7, scale: 2, nullable:false})
    preco: number

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
 onDelete: "CASCADE"
    })
    categoria: Categoria

    @ManyToOne (() => Usuario, (usuario) => usuario.produto, {
        onDelete: 'CASCADE'
    })
    usuario: Usuario 
}



