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
    getNewFood(id, nome, descricao, preco, peso, sabor) {
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
    removeFood(id) {
        this.db.removeFood(id);
    }
}
exports.default = FoodController;
