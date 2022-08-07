//estrutura de um nó numa lista de adjacencias
class No {
    id: number;//valor ou id do vértice
    weight: number; //peso da aresta entre o vértice e seu leader
    leader: No; //ponteiro o para vértice de cima na árvore
    passouPorAqui: boolean; //flag indicando se o algoritmo já passou por este nó
    vizinhosDisponiveis: number; //indica quantos vizinhos ainda possuem passouPorAqui=true
    constructor(leader: No, id: number, weight = 1) {
        // this.grau++;
        this.id = id;
        this.weight = weight;
        this.leader = leader;
        this.passouPorAqui = false;
    }

    getVizinhosDisponiveis = function (): number {
        let cont = 0;
        //iteracao por todos os vizinhos
        let aux = this.leader;
        while (aux != undefined) {
            if (aux.passouPorAqui) cont++;
            aux = this.leader;
        }
        return cont;
    }

    //retorna true se é válido colocar este nó na posição k
    isValid = function (k: number): boolean {
        if (this.passouPorAqui) return false;
        //iteracao por todos os vizinhos
        let aux = this.leader;
        while (aux != undefined) {
            if (this.id == k - 1) return true;
            aux = this.leader;
        }
        return false;
    }
}

class Grafo {
    vertices: number;
    arestas: number;
    adj: No[];
    constructor(vertices: number) {
        this.vertices = vertices; //número de vertices
        this.arestas = 0; //número de arestas
        for (let index = 0; index < vertices; index++) {
            this.adj = new Array<No>(vertices);
        }
    }
    //inserir aresta no grafo G
    inserirAresta = function (node1: number, node2: number, weight = 1) {
        this.adj[node1] = new No(this.adj[node1], node2, weight);
        this.adj[node2] = new No(this.adj[node2], node1, weight);
        this.arestas++;
    }

    possuiCicloHamiltoniano = function(noInicial: number): boolean {
        //eliminar grafos inválidos
        if(this.adj.find(n => !n || n.getVizinhosDisponiveis() < 2)) return false;

        //inicializações necessarias
        this.adj[noInicial].passouPorAqui = true;
        let proximoVizinho = this.adj[noInicial].id;
        let caminho = [noInicial]
        //iteração
        for (; caminho.length <= this.vertices; caminho.push(proximoVizinho)) {
            while(this.adj[proximoVizinho] != undefined && this.adj[proximoVizinho].passouPorAqui){
                proximoVizinho = this.adj[proximoVizinho].leader;
            }
        }
        return caminho.length == this.vertices;
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