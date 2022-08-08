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
        //busca por primeiro vizinho
        console.log("iniciando busca por primeiro vizinho disponível");
        var passos = 0;
        for (var no = this.adj[noInicial]; passos < this.vertices; passos++) {
            if (no == undefined) {
                console.log("Busca chegou a um beco sem saida");
                break;
            }
            console.log("Verificando nó", no.id);
            no.passouPorAqui = true;
            //implementar heuristica de busca
            if (no.getVizinhosDisponiveis() == 0 && no.vizinhos.includes(this.adj[noInicial]))
                return true;
            no = no.vizinhos.find(function (viz) { return !viz.passouPorAqui; });
        }
        console.log("busca por primeiro vizinho concluida em ", passos, "passos");
        //resetar flags de busca
        this.adj.forEach(function (n) { return n.passouPorAqui = false; });
        //busca por vizinho com mais vizinhos disponiveis, desempate com menor grau, desempate com maior id
        console.log("iniciando busca por vizinho com mais vizinhos disponiveis");
        passos = 0;
        for (var no = this.adj[noInicial]; passos < this.vertices; passos++) {
            if (no == undefined) {
                console.log("Busca chegou a um beco sem saida");
                break;
            }
            console.log("Verificando nó", no.id);
            no.passouPorAqui = true;
            //implementar heuristica de busca
            if (no.getVizinhosDisponiveis() == 0 && no.vizinhos.includes(this.adj[noInicial]))
                return true;
            no = no.vizinhos.sort(sortNos).find(function (viz) { return !viz.passouPorAqui; });
        }
        console.log("busca por vizinho com  mais vizinhos disponiveis concluída em ", passos, "passos");
        //resetar flags de busca
        this.adj.forEach(function (n) { return n.passouPorAqui = false; });
        //busca por vizinho com menos vizinhos disponiveis, desempate com maior grau, desempate com menor id
        console.log("iniciando busca por vizinho com menos vizinhos disponiveis");
        passos = 0;
        for (var no = this.adj[noInicial]; passos < this.vertices; passos++) {
            if (no == undefined) {
                console.log("Busca chegou a um beco sem saida");
                break;
            }
            console.log("verificando no", no.id);
            no.passouPorAqui = true;
            //implementar heuristica de busca
            if (no.getVizinhosDisponiveis() == 0 && no.vizinhos.includes(this.adj[noInicial]))
                return true;
            no = no.vizinhos.sort(sortNos).reverse().find(function (viz) { return !viz.passouPorAqui; });
        }
        console.log("busca por vizinho com menos vizinhos disponiveis concluída em ", passos, "passos");
        return false;
    };
    return Grafo;
}());
exports.Grafo = Grafo;
;
//função auxiliar para ordenar os nós
function sortNos(a, b) {
    if (a.getVizinhosDisponiveis() == b.getVizinhosDisponiveis()) {
        if (a.grau == b.grau) {
            return a.id > b.id ? -1 : 1;
        }
        return a.grau < b.grau ? -1 : 1;
    }
    return a.getVizinhosDisponiveis() < b.getVizinhosDisponiveis() ? -1 : 1;
}
/**CONSTRUÇÃO DO GRAFO, ALTERE SOMENTE AQUI */
var G = new Grafo(20);
G.inserirAresta(0, 1);
G.inserirAresta(0, 4);
G.inserirAresta(0, 7);
G.inserirAresta(1, 2);
G.inserirAresta(1, 9);
G.inserirAresta(2, 3);
G.inserirAresta(2, 11);
G.inserirAresta(3, 4);
G.inserirAresta(3, 13);
G.inserirAresta(4, 5);
G.inserirAresta(5, 6);
G.inserirAresta(5, 14);
G.inserirAresta(6, 7);
G.inserirAresta(6, 16);
G.inserirAresta(7, 8);
G.inserirAresta(8, 9);
G.inserirAresta(8, 17);
G.inserirAresta(9, 10);
G.inserirAresta(10, 11);
G.inserirAresta(10, 18);
G.inserirAresta(11, 12);
G.inserirAresta(12, 13);
G.inserirAresta(12, 19);
G.inserirAresta(13, 14);
G.inserirAresta(14, 15);
G.inserirAresta(15, 16);
G.inserirAresta(16, 17);
G.inserirAresta(17, 18);
G.inserirAresta(18, 19);
//EXIBIÇÃO DO RESULTADO
if (G.possuiCicloHamiltoniano(0))
    console.log('Grafo possui Ciclo Hamiltoniano!');
else
    console.log('Grafo não possui Ciclo Hamiltoniano, ou problema não foi tratável');
