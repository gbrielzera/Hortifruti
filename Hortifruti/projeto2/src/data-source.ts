import "reflect-metadata"; // Importa o módulo reflect-metadata
import { DataSource } from "typeorm" // Importa a classe DataSource do TypeORM
import { Categoria } from "./entity/Categoria"; // Importa a entidade Categoria
import { Produto } from "./entity/Produto"; // Importa a entidade Produto

export const AppDataSource = new DataSource({ // Cria uma nova instância de DataSource
    type: 'sqlite', // Define o tipo de banco de dados como SQLite
    database: 'src/dados.db', // Define o nome do banco de dados
    synchronize: true, // Sincroniza o banco de dados com as entidades
    logging: false, // Desativa o log de consultas SQL
    entities: [Categoria, Produto], // Define as entidades a serem usadas
    migrations: ['src/migration/*.ts'], // Define o caminho para as migrações
    subscribers: [], // Define os subscribers (nenhum neste caso)
});
