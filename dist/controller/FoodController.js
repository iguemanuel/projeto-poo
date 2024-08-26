"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const Food_1 = require("../model/Food");
const CustomError_1 = __importDefault(require("../types/CustomError"));
class FoodController {
    constructor() {
        this.db = new Database_1.default();
    }
    // Implementação com validação usando try-catch
    getNewFood(id, nome, descricao, preco, peso, sabor) {
        try {
            if (preco <= 0) {
                throw new CustomError_1.default(402, 'Erro: O preço deve ser maior que zero.');
            }
            if (peso <= 0) {
                throw new CustomError_1.default(402, 'Erro: O peso deve ser maior que zero.');
            }
            if (sabor === undefined) {
                throw new CustomError_1.default(402, 'Erro: O sabor deve ser definido.');
            }
        }
        catch (error) {
            if (error instanceof CustomError_1.default) {
                error.sayError();
            }
            throw error; // Relança o erro após o tratamento
        }
        return new Food_1.Food(id, nome, descricao, preco, peso, sabor);
    }
    addFood(food) {
        if (this.db.getAllFoods().some(f => f.getId() === food.getId())) {
            throw new CustomError_1.default(400, 'Erro: O ID já existe.');
        }
        this.db.addNewFood(food);
    }
    listFood() {
        console.log(this.db.getFoodSize());
    }
    getAllFoods() {
        return this.db.getAllFoods();
    }
    getAllFoodsFormatted() {
        return this.db.getAllFoods().map(food => food.getFoodFormatado());
    }
    removeFoodById(id) {
        this.db.removeFoodById(id); // Chama o método do banco de dados para remover o alimento
        console.log(`Alimento com ID ${id} foi excluído com sucesso.`);
    }
}
exports.default = FoodController;
