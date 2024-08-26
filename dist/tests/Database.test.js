"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FoodCategory_1 = require("../model/FoodCategory");
const FoodController_1 = __importDefault(require("../controller/FoodController"));
describe('FoodController', () => {
    test('adicionando comida', () => {
        const foodController = new FoodController_1.default();
        const food = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, FoodCategory_1.Categoria.Salgado);
        foodController.addFood(food);
        expect(foodController.getAllFoods()).toContainEqual(food);
    });
});
describe('FoodController', () => {
    test('listando comidas', () => {
        const foodController = new FoodController_1.default();
        const food1 = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, FoodCategory_1.Categoria.Salgado);
        const food2 = foodController.getNewFood(2, 'Empadinha', 'Com palmito', 6.50, 0.3, FoodCategory_1.Categoria.Salgado);
        const food3 = foodController.getNewFood(3, 'Brigadeiro', 'Com granulado', 2.00, 0.05, FoodCategory_1.Categoria.Doce);
        foodController.addFood(food1);
        foodController.addFood(food2);
        const foods = foodController.getAllFoods();
        expect(foods.length).toBe(2);
        expect(foods).toContainEqual(food1);
        expect(foods).toContainEqual(food2);
    });
});
describe('FoodController', () => {
    test('removendo comida', () => {
        const foodController = new FoodController_1.default();
        const food = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, FoodCategory_1.Categoria.Salgado);
        foodController.addFood(food);
        foodController.removeFoodById(food.getId());
        expect(foodController.getAllFoods()).not.toContainEqual(food);
    });
});
describe('FoodControler', () => {
    test('Listar nulo caso nada seja cadastrado', () => {
        const foodController = new FoodController_1.default();
        expect(foodController.getAllFoods()).toEqual([]);
    });
});
