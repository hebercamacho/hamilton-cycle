"use strict";
exports.__esModule = true;
exports.Grafo = exports.No = void 0;
//estrutura de um nó numa lista de adjacencias
var No = /** @class */ (function () {
    function No(id) {
        //retorna o numero de nos vizinhos que possuem passouPorAqui=true
        this.getVizinhosDisponiveis = function () {
            var cont = 0;
            //iteracao por todos os vizinhos
            this.vizinhos.forEach(function (viz) {
                if (viz.passouPorAqui)
                    cont++;
            });
            return cont;
        };
        this.grau = 0;
        this.id = id;
        this.passouPorAqui = false;
        this.vizinhos = new Array();
    }
    No.prototype.inserirVizinho = function (viz) {
        this.vizinhos.push(viz);
        this.grau++;
    };
    return No;
}());
exports.No = No;
var Grafo = /** @class */ (function () {
    function Grafo(vertices) {
        //inserir aresta no grafo G
        this.inserirAresta = function (node1, node2) {
            this.adj[node1].inserirVizinho(this.adj[node2]);
            this.adj[node2].inserirVizinho(this.adj[node1]);
            this.arestas++;
        };
        this.possuiCicloHamiltoniano = function (noInicial) {
            //eliminar grafos inválidos
            if (this.adj.find(function (n) { return n.getVizinhosDisponiveis() < 2; }))
                return false;
            return false;
        };
        this.vertices = vertices; //número de vertices
        this.arestas = 0; //número de arestas
        this.adj = new Array(vertices);
        for (var index = 0; index < this.adj.length; index++) {
            this.adj[index] = new No(index);
        }
    }
    return Grafo;
}());
exports.Grafo = Grafo;
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
