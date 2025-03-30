import 'reflect-metadata' // Importa o módulo reflect-metadata para suporte a decoradores
import { Column, Entity, PrimaryGeneratedColumn,OneToMany,CreateDateColumn } from 'typeorm'; // Importa os decoradores e tipos necessários do TypeORM
import { Produto } from "./Produto"; // Importa a entidade Produto

@Entity("categorias") // Define a entidade Categoria

export class Categoria{ // Define a classe Categoria
    @PrimaryGeneratedColumn() // Define a coluna idCategoria como chave primária e auto incrementável
    idCategoria:number;

    @Column({ type: "varchar", length: 100 }) // Define a coluna nome como varchar com limite de 100 caracteres
    nome:string;

    @Column({ type: "varchar", length: 500 }) // Define a coluna descricaoCategoria como varchar com limite de 500 caracteres
    descricaoCategoria:string

    @CreateDateColumn() // Define a coluna dataCriacao como data de criação automática
    dataCriacao:Date

    @OneToMany(() => Produto, (produto) => produto.categoria) // Define o relacionamento um-para-muitos com a entidade Produto
    produtos: Produto[];
    

}