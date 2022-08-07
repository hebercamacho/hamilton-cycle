//estrutura de um nó numa lista de adjacencias
var No = /** @class */ (function () {
    function No(leader, id, weight) {
        if (weight === void 0) { weight = 1; }
        this.getVizinhosDisponiveis = function () {
            var cont = 0;
            //iteracao por todos os vizinhos
            var aux = this.leader;
            while (aux != undefined) {
                if (aux.passouPorAqui)
                    cont++;
                aux = this.leader;
            }
            return cont;
        };
        //retorna true se é válido colocar este nó na posição k
        this.isValid = function (k) {
            if (this.passouPorAqui)
                return false;
            //iteracao por todos os vizinhos
            var aux = this.leader;
            while (aux != undefined) {
                if (this.id == k - 1)
                    return true;
                aux = this.leader;
            }
            return false;
        };
        // this.grau++;
        this.id = id;
        this.weight = weight;
        this.leader = leader;
        this.passouPorAqui = false;
    }
    return No;
}());
var Grafo = /** @class */ (function () {
    function Grafo(vertices) {
        //inserir aresta no grafo G
        this.inserirAresta = function (node1, node2, weight) {
            if (weight === void 0) { weight = 1; }
            this.adj[node1] = new No(this.adj[node1], node2, weight);
            this.adj[node2] = new No(this.adj[node2], node1, weight);
            this.arestas++;
        };
        this.possuiCicloHamiltoniano = function (noInicial) {
            //eliminar grafos inválidos
            if (this.adj.find(function (n) { return !n || n.getVizinhosDisponiveis() < 2; }))
                return false;
            //inicializações necessarias
            this.adj[noInicial].passouPorAqui = true;
            var proximoVizinho = this.adj[noInicial].id;
            var caminho = [noInicial];
            //iteração
            for (; caminho.length <= this.vertices; caminho.push(proximoVizinho)) {
                while (this.adj[proximoVizinho] != undefined && this.adj[proximoVizinho].passouPorAqui) {
                    proximoVizinho = this.adj[proximoVizinho].leader;
                }
            }
            return caminho.length == this.vertices;
        };
        this.vertices = vertices; //número de vertices
        this.arestas = 0; //número de arestas
        for (var index = 0; index < vertices; index++) {
            this.adj = new Array(vertices);
        }
    }
    return Grafo;
}());
;
//teste mockado
var G = new Grafo(5);
G.inserirAresta(0, 1);
G.inserirAresta(0, 3);
G.inserirAresta(1, 2);
G.inserirAresta(1, 3);
G.inserirAresta(1, 4);
G.inserirAresta(2, 4);
G.inserirAresta(3, 4);
G.adj.map(function (e) { return console.log(e); });
G.possuiCicloHamiltoniano(0);
