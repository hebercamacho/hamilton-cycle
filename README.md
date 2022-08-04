## Instruções

### Instalações

Baixe e instale o [Node](https://nodejs.org/download/release/latest/), caso ainda não tenha.

Utilizando o Node, instale o transpilador TSC com o comando:

`npm install -g typescript`

### Transpilação
O código encontra-se no diretório **hamilton**, no arquivo **hamilton.ts**, em Typescript. Para transpilar para a linguagem Javascript, execute o comando:

`tsc hamilton.ts`


### Execução
Após a transpilação, será gerado o arquivo **hamilton.js**.

Para executá-lo, execute o comando:

`node hamilton.js`