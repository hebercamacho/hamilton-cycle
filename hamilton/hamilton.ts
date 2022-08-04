//estrutura de um nó numa lista de adjacencias
class No {
    id: number;//valor ou id do vértice
    weight: number; //peso da aresta entre o vértice e seu leader
    leader: No; //ponteiro o para vértice de cima na árvore
    passouPorAqui: boolean;
    constructor(leader: No, id: number, weight = 1) {
        this.id = id;
        this.weight = weight;
        this.leader = leader;
        this.passouPorAqui = false;
    }

    //retorna true se é válido colocar este nó na posição k
    isValid = function(k: number): boolean{
        if(this.passouPorAqui) return false;

        let aux = this.leader;
        while(aux != undefined){
            if(this.id == k-1) return true;
            aux = this.leader;
        }
        return false;
    }
}

class Grafo {
    vertices: number;
    edges: number;
    adj: No[];
    constructor(vertices: number) {
        this.vertices = vertices; //número de vertices
        this.edges = 0; //número de arestas
        for (let index = 0; index < vertices; index++) {
            this.adj = new Array<No>(vertices);
        }
    }
    //inserir aresta no grafo G
    inserirAresta = function (node1: number, node2: number, weight = 1) {
        this.adj[node1] = new No(this.adj[node1], node2, weight);
        this.adj[node2] = new No(this.adj[node2], node1, weight);
        this.edges++;
    }
};

//teste mockado
let G: Grafo = new Grafo(5);

G.inserirAresta(0,1);
G.inserirAresta(0,3);
G.inserirAresta(1,2);
G.inserirAresta(1,3);
G.inserirAresta(1,4);
G.inserirAresta(2,4);
G.inserirAresta(3,4);

