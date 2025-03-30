import { MigrationInterface, QueryRunner, Table } from "typeorm"; // Importa as interfaces e classes necessárias do TypeORM

export class CreateTableCategorias1743284043946 implements MigrationInterface { // Define a classe de migração

    public async up(queryRunner: QueryRunner): Promise<void> { // Método para aplicar a migração
        // Criar a tabela 'categorias'
        await queryRunner.createTable( 
            new Table({
                name: "categorias",
                columns: [
                    {
                        name: "idCategoria",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true, // Indica que a coluna é auto incrementável
                        generationStrategy: "increment",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isUnique: true, // Garantir que o nome seja único
                    },
                    {
                        name: "descricaoCategoria",
                        type: "varchar",
                    },
                    {
                        name: "dataCriacao",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP", // Define a data de criação automaticamente
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter a criação da tabela 'categorias'
        await queryRunner.dropTable("categorias");
    }
}
