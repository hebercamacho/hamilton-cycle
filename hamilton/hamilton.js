"use strict";
exports.__esModule = true;
exports.Grafo = exports.No = void 0;
//estrutura de um nó numa lista de adjacencias
var No = /** @class */ (function () {
    function No(id) {
        this.grau = 0;
        this.id = id;
        this.passouPorAqui = false;
        this.vizinhos = new Array();
    }
    No.prototype.inserirVizinho = function (viz) {
        this.vizinhos.push(viz);
        this.grau++;
    };
    //retorna o numero de nos vizinhos que possuem passouPorAqui=true
    No.prototype.getVizinhosDisponiveis = function () {
        var cont = 0;
        //iteracao por todos os vizinhos
        this.vizinhos.forEach(function (viz) {
            if (!viz.passouPorAqui)
                cont++;
        });
        return cont;
    };
    return No;
}());
exports.No = No;
var Grafo = /** @class */ (function () {
    function Grafo(vertices) {
        this.vertices = vertices; //número de vertices
        this.arestas = 0; //número de arestas
        this.adj = new Array(vertices);
        for (var index = 0; index < this.adj.length; index++) {
            this.adj[index] = new No(index);
        }
    }
    //inserir aresta no grafo G
    Grafo.prototype.inserirAresta = function (node1, node2) {
        this.adj[node1].inserirVizinho(this.adj[node2]);
        this.adj[node2].inserirVizinho(this.adj[node1]);
        this.arestas++;
    };
    Grafo.prototype.possuiCicloHamiltoniano = function (noInicial) {
        var _this = this;
        //eliminar grafos inválidos
        //grafos sem o número mínimo de arestas pra formar um ciclo
        if (this.arestas < this.vertices)
            return false;
        //grafos com vertices desconexos ou conectados por uma aresta
        if (this.adj.find(function (n) { return n.getVizinhosDisponiveis() < 2; }))
            return false;
        //acertar grafos que com certeza
        //grafos completos
        if (this.adj.every(function (n) { return n.grau >= _this.vertices - 1; }))
            return true;
        //busca
        var passos = 0;
        for (var no = this.adj[noInicial]; no != undefined && passos < this.vertices; passos++) {
            console.log("verificando no ", no.id);
            no.passouPorAqui = true;
            //implementar heuristica de busca
            if (no.getVizinhosDisponiveis() == 0 && no.vizinhos.includes(this.adj[noInicial]))
                return true;
            no = no.vizinhos.find(function (viz) { return !viz.passouPorAqui; });
        }
        console.log("passos", passos);
        return passos == this.vertices;
    };
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
// G.adj.map(e => console.log(e));
console.log('possuiCicloHamiltoniano', G.possuiCicloHamiltoniano(0));
