import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"; // Importa as interfaces e classes necessárias do TypeORM

export class CreateTableProdutos1743284056417 implements MigrationInterface { // Define a classe de migração

    public async up(queryRunner: QueryRunner): Promise<void> { // Método para aplicar a migração
        // Criar a tabela 'produtos'
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: "idProduto",
                        type: "uuid",
                        isPrimary: true,  // Define como chave primária
                        isGenerated: true, // Definindo que será gerado automaticamente
                        generationStrategy: "uuid",  // Usando UUID para a chave primária
                    },
                    {
                        name: "nomeProduto",
                        type: "varchar",
                    },
                    {
                        name: "descricao",
                        type: "varchar",
                    },
                    {
                        name: "preco",
                        type: "decimal", // Definindo o tipo decimal para o preço
                    },
                    {
                        name: "quantidade",
                        type: "integer",
                    },
                    {
                        name: "categoriaId",
                        type: "integer",  // A chave estrangeira de 'Categoria'
                    },
                    {
                        name: "dataCriacao",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP", // A data de criação será preenchida automaticamente
                    },
                    {
                        name: "dataAtualizacao",
                        type: "timestamp",
                        isNullable: true, // O campo de data de atualização é opcional
                    },
                ],
            })
        );

        // Adicionar a chave estrangeira (relacionamento com Categoria)
        await queryRunner.createForeignKey(
            "produtos",  // Nome da tabela onde a FK será criada
            new TableForeignKey({
                columnNames: ["categoriaId"],  // Coluna que faz referência à categoria
                referencedTableName: "categorias",  // Tabela referenciada (Categoria)
                referencedColumnNames: ["idCategoria"],  // Coluna da tabela referenciada
                onDelete: "CASCADE",  // Ação ao excluir uma categoria (excluir os produtos relacionados)
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira antes de remover a tabela
        const table = await queryRunner.getTable("produtos");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("categoriaId") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("produtos", foreignKey);
        }

        // Reverter a criação da tabela 'produtos'
        await queryRunner.dropTable("produtos");
    }
}
