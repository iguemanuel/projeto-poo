import { Food } from "./model/Food";
import { Categoria }  from "./model/FoodCategory";
import Database from "./db/Database"
import FoodController from "./controller/FoodController";

// Check if the module exports a member named "FoodCategory"
// If not, update the import statement accordingly

// Criar instâncias de alimentos e bebidasx
let pastel = new Food(1, "Pastel", "Pastel de carne", 5.00, 0.2, Categoria.Salgado);
//Instanciar os controllers

const foodController = new FoodController();

// Adicionar alimentos e bebidas
foodController.addFood(pastel);

// Listar alimentos e bebidas
foodController.listFood();


// Listar todos os alimentos e bebidas
console.log(foodController.getAllFoods());




