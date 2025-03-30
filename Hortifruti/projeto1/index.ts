import promptSync from "prompt-sync"; // Importando a biblioteca prompt-sync
import { Categoria } from "./models/Categoria"; // Importando o modelo Categoria
import { Produto } from "./models/Produto"; // Importando o modelo Produto

const prompt = promptSync(); // Instanciando o prompt-sync

function exibirMenu() { // Função para exibir o menu
    console.log("Escolha o que quer fazer:\n1 - Criar\n2 - Exibir\n3 - Buscar\n4 - Atualizar\n5 - Remover\n6 - Voltar ao menu anterior");
}

let categorias: Categoria[] = []; // Array para armazenar categorias
let produtos: Produto[] = []; // Array para armazenar produtos

let opcaoDeMenu: number; // Variável para armazenar a opção do menu principal

function criar(tipoDeMenu: number) { // Função para criar produtos ou categorias
    const nome = String(prompt("Insira o nome: "));
    const descricao = String(prompt("Insira uma breve descrição: "));
    const dataCriacao = new Date().toLocaleDateString("pt-BR");

    if (tipoDeMenu == 1) { // Se for criar um produto
        const preco = Number(prompt("Insira um valor: "));
        const quantidade = Number(prompt("Insira a quantidade do produto: "));
        const categoriaId = Number(prompt("Qual a ID da categoria? "));

        let produto: Produto = {
            nome: nome,
            descricao: descricao,
            categoriaId: categoriaId,
            idProduto: produtos.length + 1,
            preco: preco,
            quantidade: quantidade,
            dataCriacao: dataCriacao,
            dataAtualizacao: null

        };
        produtos.push(produto);
        console.log("Produto criado com sucesso!");
    } else { // Se for criar uma categoria
        let categoria: Categoria = {
            nome: nome,
            descricaoCategoria: descricao,
            IdCategoria: categorias.length + 1,
            dataCriacao: dataCriacao,
        };
        categorias.push(categoria);
        console.log("Categoria criada com sucesso!");
    }
}

function listar(tipoDeMenu: number) { // Função para listar produtos ou categorias
    if (tipoDeMenu == 1) {
        console.table(produtos)
    } else {
        console.table(categorias);
    }

}

function Buscar(tipoDeMenu: number) { // Função para buscar produtos ou categorias
    if (tipoDeMenu == 1) { // Se for buscar um produto

        const modoBusca = prompt("Deseja buscar pelo ID , nome ou categoria")
        modoBusca.toLowerCase()
        if (modoBusca == 'id') {
            const id = Number(prompt("Digite o ID da categoria: "));
            const produtoEncontrado = produtos.find((prod) => prod.idProduto === id);
            if (produtoEncontrado) {
                console.log(produtoEncontrado);
            } else {
                console.log("Categoria não encontrada.");
            }
        } else if (modoBusca == "nome") {
            const nome = prompt("Digite o nome da categoria")
            const produtoEncontrado = produtos.find((prod) => prod.nome === nome)
            if (produtoEncontrado) {
                console.log(produtoEncontrado);
            } else {
                console.log("Categoria não encontrada.");
            }
        } else if (modoBusca == "categoria") {
            const IdCategoria = Number(prompt("Digite o nome da categoria"))
            const produtoEncontrado = produtos.find((prod) => prod.categoriaId === IdCategoria)
            if (produtoEncontrado) {
                console.log(produtoEncontrado);
            } else {
                console.log("Categoria não encontrada.");
            }
        } else {
            console.log("Digitou merda")
        }


    } else { // Se for buscar uma categoria
        const modoBusca = prompt("Deseja buscar pelo ID ou nome")
        modoBusca.toLowerCase()
        if (modoBusca == 'id') {
            const id = Number(prompt("Digite o ID da categoria: "));
            const categoriaEcontrada = categorias.find((cat) => cat.IdCategoria === id);
            if (categoriaEcontrada) {
                console.log(categoriaEcontrada);
            } else {
                console.log("Categoria não encontrada.");
            }
        } else if (modoBusca == "nome") {
            const nome = prompt("Digite o nome da categoria")
            const categoriaEcontrada = categorias.find((cat) => cat.nome === nome)
            if (categoriaEcontrada) {
                console.log(categoriaEcontrada);
            } else {
                console.log("Categoria não encontrada.");
            }
        } else {
            console.log("Digitou merda")
        }
    }
}

function atualizar(tipoDeMenu: number) { // Função para atualizar produtos ou categorias
    if (tipoDeMenu == 1) { // Se for atualizar um produto
        console.table(produtos);
        const produtoQueSeraAtualizado = Number(prompt("Digite o ID do produto que irá atualizar: "));
        const produtoEncontrado = produtos.find((prod) => prod.idProduto === produtoQueSeraAtualizado);
        if (produtoEncontrado) { // Se o produto for encontrado
            const nome = String(prompt("Insira o nome: "));
            const descricao = String(prompt("Insira uma breve descrição: "));
            const dataAtualizacao = String(prompt("Insira a data de atualização: "));
            const preco = Number(prompt("Insira um valor: "));
            const quantidade = Number(prompt("Insira a quantidade do produto: "));
            const categoriaId = Number(prompt("Qual a ID da categoria? "));
            // const dataCriacao = produtoEncontrado.dataCriacao
            
            // Atualizando o produto encontrado
            produtoEncontrado.nome = nome;
            produtoEncontrado.descricao = descricao;
            produtoEncontrado.dataAtualizacao = dataAtualizacao;
            produtoEncontrado.preco = preco;
            produtoEncontrado.quantidade = quantidade;
            produtoEncontrado.categoriaId = categoriaId;

            console.log("Produto atualizado com sucesso!");
        } else { // Se o produto não for encontrado
            console.log("Produto não encontrado.");
        }
    } else { // Se for atualizar uma categoria
        console.table(categorias);
        const categoriaQueSeraAtualizada = Number(prompt("Digite o ID da categoria que irá atualizar: "));
        const categoriaEcontrada = categorias.find((cat) => cat.IdCategoria === categoriaQueSeraAtualizada);
        if (categoriaEcontrada) { // Se a categoria for encontrada
            const nome = String(prompt("Insira o nome da categoria: "));
            const descricaoCategoria = String(prompt("Insira uma breve descrição: "));
            const dataCriacao = String(prompt("Insira a data de criação: "));

            // Atualizando a categoria encontrada
            categoriaEcontrada.nome = nome;
            categoriaEcontrada.descricaoCategoria = descricaoCategoria;
            categoriaEcontrada.dataCriacao = dataCriacao;

            console.log("Categoria atualizada com sucesso!");
        } else { // Se a categoria não for encontrada
            console.log("Categoria não encontrada.");
        }
    }
}

function remover(tipoDeMenu: number) { // Função para remover produtos ou categorias
    if (tipoDeMenu == 1) { // Se for remover um produto
        produtos.length = 0
    } else {
        categorias.length = 0 // Se for remover uma categoria
    }
}

do { // Menu principal
    console.log("Bem-vindo ao menu Principal \nEscolha sua opção de navegação:\n1 - Gestão Produtos\n2 - Gestão Categorias\n3 - Sair do sistema");
    opcaoDeMenu = Number(prompt("Insira sua opção 1, 2 ou 3: "));

    if (opcaoDeMenu == 1) { // Se for acessar o menu de produtos
        let opcaoMenuProduto: number;
        do {
            console.log("Você acessou o menu de Produto");
            exibirMenu();
            opcaoMenuProduto = Number(prompt("Insira a sua escolha: "));

            switch (opcaoMenuProduto) {
                case 1:
                    criar(1);
                    break;
                case 2:
                    listar(1);
                    break;
                case 3:
                    Buscar(1)
                    break;
                case 4:
                    atualizar(1)
                    break;
                case 5:
                    remover(1)
                    break;
                case 6:
                    console.log("Voltando...");
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        } while (opcaoMenuProduto >= 1 && opcaoMenuProduto <= 5);
    } else if (opcaoDeMenu == 2) { // Se for acessar o menu de categorias
        let opcaoMenuCategoria: number;
        do {
            console.log("Você acessou o menu de CATEGORIAS");
            exibirMenu();
            opcaoMenuCategoria = Number(prompt("Insira a sua escolha: "));

            switch (opcaoMenuCategoria) {
                case 1:
                    criar(2);
                    break;
                case 2:
                    listar(2);
                    break;
                case 3:
                    Buscar(2)
                    break;
                case 4:
                    atualizar(2);
                    break;
                case 5:
                    remover(2);
                    break;
                case 6:
                    console.log("Voltando...");
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        } while (opcaoMenuCategoria >= 1 && opcaoMenuCategoria <= 5);
    } else { // Se for sair do sistema
        console.log("Fluxo encerrado");
    }
} while (opcaoDeMenu == 1 || opcaoDeMenu == 2);
