import "reflect-metadata"; // Importa o módulo reflect-metadata para suporte a decoradores
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,CreateDateColumn, UpdateDateColumn } from 'typeorm'; // Importa os decoradores e tipos necessários do TypeORM
import {Categoria} from './Categoria' // Importa a entidade Categoria

@Entity("produtos") // Define a entidade Produto
export class Produto{ // Define a classe Produto
    @PrimaryGeneratedColumn() // Define a coluna idProduto como chave primária e auto incrementável
    idProduto:number;

    @Column({ type: "varchar", length: 100 })  // Define a coluna nomeProduto como varchar com limite de 100 caracteres
    nomeProduto: string;

    @Column({ type: "varchar", length: 800 }) // Define a coluna descricao como varchar com limite de 800 caracteres
    descricao:string

    @Column({ type: "numeric", precision: 10, scale: 2 }) // Define a coluna preco como numérico com precisão e escala
    quantidade:number

    @Column({type:"integer"}) // Define a coluna preco como inteiro
    valor:number

    @CreateDateColumn() // Define a coluna dataCriacao como data de criação automática
    dataCriacao:Date

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos) // Define o relacionamento muitos-para-um com a entidade Categoria
  categoria: Categoria;

    @UpdateDateColumn() // Define a coluna dataAtualizacao como data de atualização automática
    dataAtualizacao?: Date;

}