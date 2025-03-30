import "reflect-metadata"; // Importa o módulo reflect-metadata para suporte a decoradores
import Fastify from "fastify"; // Importa o framework Fastify para criação do servidor
import { AppDataSource } from "./data-source"; // Importa a fonte de dados configurada
import { Categoria } from "./entity/Categoria"; // Importa a entidade Categoria
import { Produto } from "./entity/Produto"; // Importa a entidade Produto
import { FastifyRequest } from 'fastify'; // Importa o tipo FastifyRequest para tipagem das requisições

const App = Fastify(); // Cria uma instância do Fastify

// Inicializa a fonte de dados (banco de dados)
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados inicializado!");

    // Rota para Criar uma nova Categoria
    App.post("/CriarCategoria", async (request, reply) => { 
      try { 
        // Extrai os dados do corpo da requisição
        const { nome, descricaoCategoria } = request.body as {
          nome: string;
          descricaoCategoria: string;
        };

        // Cria uma nova instância de Categoria
        const categoria = new Categoria();
        categoria.nome = nome;
        categoria.descricaoCategoria = descricaoCategoria;

        // Salva a categoria no banco de dados
        const novaCategoria = await AppDataSource.manager.save(categoria);
        return reply.send(novaCategoria);
      } catch (error) {
        console.error("Erro ao criar categoria:", error);
        return reply.status(500).send({ error: "Erro ao criar categoria." });
      }
    });

    // Rota para obter todas as Categorias
    App.get("/categorias", async (_, reply) => {
      try {
        // Busca todas as categorias no banco de dados
        const lista = await AppDataSource.manager.find(Categoria);
        return reply.send(lista);
      } catch (error) {
        return reply.status(500).send({ error: "Erro ao buscar categorias." });
      }
    });

    // Rota para excluir uma Categoria pelo ID
    App.delete("/categorias/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const categoriaId = Number(request.params.id);
        
        // Busca a categoria pelo ID
        const categoria = await AppDataSource.manager.findOne(Categoria, { where: { idCategoria: categoriaId } });
        if (!categoria) {
          return reply.status(404).send({ error: "Categoria não encontrada." });
        }

        // Remove a categoria
        await AppDataSource.manager.remove(categoria);
        return reply.status(200).send({ message: "Categoria excluída com sucesso." });
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        return reply.status(500).send({ error: "Erro ao excluir categoria." });
      }
    });

    // Rota para atualizar uma Categoria
    App.put("/categorias/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const categoriaId = Number(request.params.id);
        const { nome, descricaoCategoria } = request.body as {
          nome: string;
          descricaoCategoria: string;
        };

        // Busca a categoria pelo ID
        const categoria = await AppDataSource.manager.findOne(Categoria, { where: { idCategoria: categoriaId } });
        if (!categoria) {
          return reply.status(404).send({ error: "Categoria não encontrada." });
        }

        // Atualiza os dados da categoria
        categoria.nome = nome;
        categoria.descricaoCategoria = descricaoCategoria;
        const categoriaAtualizada = await AppDataSource.manager.save(categoria);
        return reply.send(categoriaAtualizada);
      } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        return reply.status(500).send({ error: "Erro ao atualizar categoria." });
      }
    });

    // Rota para Criar um Produto
    App.post("/CriarProduto", async (request, reply) => {
      try {
        const { nomeProduto, descricao, quantidade, valor, categoriaId } = request.body as {
          nomeProduto: string;
          descricao: string;
          quantidade: number;
          valor: number;
          categoriaId: number;
        };

        // Busca a categoria associada ao produto
        const categoria = await AppDataSource.manager.findOne(Categoria, { where: { idCategoria: categoriaId } });
        if (!categoria) {
          return reply.status(404).send({ error: "Categoria não encontrada." });
        }

        // Cria uma nova instância de Produto
        const produto = new Produto();
        produto.nomeProduto = nomeProduto;
        produto.descricao = descricao;
        produto.quantidade = quantidade;
        produto.valor = valor;
        produto.categoria = categoria;

        // Salva o produto no banco de dados
        const novoProduto = await AppDataSource.manager.save(produto);
        return reply.send(novoProduto);
      } catch (error) {
        console.error("Erro ao criar produto:", error);
        return reply.status(500).send({ error: "Erro ao criar produto." });
      }
    });

    // Rota para obter todos os Produtos
    App.get("/produtos", async (_, reply) => {
      try {
        // Busca todos os produtos e suas categorias
        const lista = await AppDataSource.manager.find(Produto, { relations: ['categoria'] });
        return reply.send(lista);
      } catch (error) {
        return reply.status(500).send({ error: "Erro ao buscar produtos." });
      }
    });

    // Inicia o servidor na porta 4500
    App.listen({ port: 4500 }).then(() => {
      console.log("Servidor rodando na porta 4500");
    });
  })
  .catch((error) => console.error("Erro ao inicializar o banco:", error));
