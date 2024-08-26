import Database from "../db/Database";
import {Food} from "../model/Food";
import CustomError from "../types/CustomError";
import { Categoria } from "../model/FoodCategory";
import FoodController from "../controller/FoodController";
import exp from "constants";


describe('FoodController', () => {
    test('adicionando comida', () => {
        const foodController = new FoodController();
        const food = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, Categoria.Salgado);
        
        foodController.addFood(food);
        
        expect(foodController.getAllFoods()).toContainEqual(food);
    });
});

describe('FoodController', () => {
    test('listando comidas', () => {
        const foodController = new FoodController();
        const food1 = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, Categoria.Salgado);
        const food2 = foodController.getNewFood(2, 'Empadinha', 'Com palmito', 6.50, 0.3, Categoria.Salgado);
        const food3 = foodController.getNewFood(3, 'Brigadeiro', 'Com granulado', 2.00, 0.05, Categoria.Doce);
    
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
        const foodController = new FoodController();
        const food = foodController.getNewFood(1, 'Coxinha', 'Recheada de Frango', 5.00, 0.1, Categoria.Salgado);
    
        foodController.addFood(food);
        foodController.removeFoodById(food.getId()); 
        expect(foodController.getAllFoods()).not.toContainEqual(food);
    });
});

describe('FoodControler', () => {
    test('Listar nulo caso nada seja cadastrado', () => {
        const foodController = new FoodController();
        expect(foodController.getAllFoods()).toEqual([]);
    });
}); 
