import { Categoria } from "../model/FoodCategory";
import { Food } from "../model/Food";

export interface IFoodController {
    addFood(food: Food): void;
    getNewFood(id: number, nome: string, descricao: string, preco: number, peso: number, sabor: Categoria): Food;
    listFood(): void;
    getAllFoods(): Food[];
    removeFood(id: number): void;
}