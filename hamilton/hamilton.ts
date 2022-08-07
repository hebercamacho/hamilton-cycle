//estrutura de um nó numa lista de adjacencias
export class No {
    id: number;//valor ou id do vértice
    passouPorAqui: boolean; //flag indicando se o algoritmo já passou por este nó
    grau: number;
    vizinhos: Array<No>;
    constructor(id: number) {
        this.grau=0;
        this.id = id;
        this.passouPorAqui = false;
        this.vizinhos = new Array<No>();
    }

    inserirVizinho(viz: No)
    {
        this.vizinhos.push(viz);
        this.grau++;
    }
    
    //retorna o numero de nos vizinhos que possuem passouPorAqui=true
    getVizinhosDisponiveis = function (): number {
        let cont = 0;
        //iteracao por todos os vizinhos
        this.vizinhos.forEach(viz => {
            if(viz.passouPorAqui) cont++;
        });
        return cont;
    }
}

export class Grafo {
    vertices: number;
    arestas: number;
    adj: Array<No>;
    constructor(vertices: number) {
        this.vertices = vertices; //número de vertices
        this.arestas = 0; //número de arestas
        this.adj = new Array<No>(vertices);
        for (let index = 0; index < this.adj.length; index++) {
            this.adj[index] = new No(index)
        }
    }
    //inserir aresta no grafo G
    inserirAresta = function (node1: number, node2: number) {
        this.adj[node1].inserirVizinho(this.adj[node2]);
        this.adj[node2].inserirVizinho(this.adj[node1]);
        this.arestas++;
    }

    possuiCicloHamiltoniano = function(noInicial: number): boolean {
        //eliminar grafos inválidos
        if(this.adj.find((n: No) => n.getVizinhosDisponiveis() < 2)) return false;

        return false;
    }
};



//teste mockado
let G: Grafo = new Grafo(5);

G.inserirAresta(0, 1);
G.inserirAresta(0, 3);
G.inserirAresta(1, 2);
G.inserirAresta(1, 3);
G.inserirAresta(1, 4);
G.inserirAresta(2, 4);
G.inserirAresta(3, 4);

G.adj.map(e => console.log(e));
G.possuiCicloHamiltoniano(0);