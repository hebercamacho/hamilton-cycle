//estrutura de um nó numa lista de adjacencias
export class No {
    id: number;//valor ou id do vértice
    passouPorAqui: boolean; //flag indicando se o algoritmo já passou por este nó
    grau: number;
    vizinhos: Array<No>;
    constructor(id: number) {
        this.grau = 0;
        this.id = id;
        this.passouPorAqui = false;
        this.vizinhos = new Array<No>();
    }

    inserirVizinho(viz: No) {
        this.vizinhos.push(viz);
        this.grau++;
    }

    //retorna o numero de nos vizinhos que possuem passouPorAqui=true
    getVizinhosDisponiveis(): number {
        let cont = 0;
        //iteracao por todos os vizinhos
        this.vizinhos.forEach(viz => {
            if (!viz.passouPorAqui) cont++;
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
    inserirAresta(node1: number, node2: number) {
        this.adj[node1].inserirVizinho(this.adj[node2]);
        this.adj[node2].inserirVizinho(this.adj[node1]);
        this.arestas++;
    }

    possuiCicloHamiltoniano(noInicial: number): boolean {
        //eliminar grafos inválidos
        //grafos sem o número mínimo de arestas pra formar um ciclo
        if (this.arestas < this.vertices)
            return false;
        //grafos com vertices desconexos ou conectados por uma aresta
        if (this.adj.find((n: No) => n.getVizinhosDisponiveis() < 2))
            return false;

        //acertar grafos que com certeza
        //grafos completos
        if (this.adj.every((n: No) => n.grau >= this.vertices - 1)) return true;

        //busca
        let passos = 0;
        for (let no: No | undefined = this.adj[noInicial]; no != undefined && passos < this.vertices; passos++) {
            console.log("verificando no ", no.id);
            no.passouPorAqui = true;
            //implementar heuristica de busca

            if (no.getVizinhosDisponiveis() == 0 && no.vizinhos.includes(this.adj[noInicial]))
                return true;

            no = no.vizinhos.find(viz => !viz.passouPorAqui)
        }
        console.log("passos", passos);
        return passos==this.vertices;
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

// G.adj.map(e => console.log(e));
console.log('possuiCicloHamiltoniano', G.possuiCicloHamiltoniano(0));