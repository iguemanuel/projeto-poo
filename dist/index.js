"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Food_1 = require("./model/Food");
const FoodCategory_1 = require("./model/FoodCategory");
const FoodController_1 = __importDefault(require("./controller/FoodController"));
// Check if the module exports a member named "FoodCategory"
// If not, update the import statement accordingly
// Criar instâncias de alimentos e bebidasx
let pastel = new Food_1.Food(1, "Pastel", "Pastel de carne", 5.00, 0.2, FoodCategory_1.Categoria.Salgado);
//Instanciar os controllers
const foodController = new FoodController_1.default();
// Adicionar alimentos e bebidas
foodController.addFood(pastel);
// Listar alimentos e bebidas
foodController.listFood();
// Listar todos os alimentos e bebidas
console.log(foodController.getAllFoods());
