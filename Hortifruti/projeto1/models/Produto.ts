export interface Produto { // Interface para o produto
    idProduto:number;
    nome:string;
    descricao:string;
    preco:number;
    quantidade:number;
    categoriaId:number;
    dataCriacao:string;
    dataAtualizacao?:string | null
}