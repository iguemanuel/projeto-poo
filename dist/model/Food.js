"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const Product_1 = __importDefault(require("./Product"));
class Food extends Product_1.default {
    constructor(id, nome, descricao, preco, peso, sabor) {
        super(id, nome, preco);
        this.peso = peso;
        this.sabor = sabor;
        this.descricao = descricao;
    }
    getNome() {
        return `${super.getNome()}`;
    }
    getPeso() {
        return this.peso;
    }
    setPeso(peso) {
        this.peso = peso;
    }
    getSabor() {
        return this.sabor;
    }
    setSabor(sabor) {
        this.sabor = sabor;
    }
    getDescricao() {
        return this.descricao;
    }
    getFoodFormatado() {
        return `- Produto: ${this.getNome()}\n- Descrição: ${this.getDescricao()}\n- Peso: ${this.getPeso()}\n- Sabor: ${this.getSabor()}\n- Preço: ${this.getPreco()}`;
    }
}
exports.Food = Food;
