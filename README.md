## Instruções

### Instalações

Baixe e instale o [Node](https://nodejs.org/download/release/latest/), caso ainda não tenha.

Utilizando o Node, instale o transpilador TSC com o comando:

`npm install -g typescript`

### Transpilação
O código encontra-se no diretório **hamilton**, no arquivo **hamilton.ts**, em Typescript. Para transpilar para a linguagem Javascript, execute o comando:

`tsc hamilton.ts`
> Caso haja algum erro nesta etapa, testar o comando com estes argumentos: `tsc hamilton.ts --lib es2016,dom`

### Execução
Após a transpilação, será gerado o arquivo **hamilton.js**.

Para executá-lo, execute o comando:

`node hamilton.js`

### Testes com outros grafos
O grafo atual é o conhecido dodecaedro, que possui ciclo hamiltoniano tendo 20 arestas. 
![dodecaedro](https://upload.wikimedia.org/wikipedia/commons/0/03/Hamiltonian_graph_example.svg)

Caso queira, é possível construir qualquer outro grafo alterando o final do arquivo **hamilton.ts**, onde um comentário indica onde pode ser alterado.

Para criar, por exemplo, um grafo no formato de um quadrado com uma diagonal, o código deve ser:

```ts
let G: Grafo = new Grafo(4);

G.inserirAresta(0, 1);
G.inserirAresta(0, 2);
G.inserirAresta(1, 2);
G.inserirAresta(1, 3);
G.inserirAresta(2, 3);
```
Outros exemplos podem ser encontrados no arquivo [grafos](/hamilton/grafos.txt).