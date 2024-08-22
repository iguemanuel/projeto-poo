import Database from "../db/Database";
import { Food } from "../model/Food";
import { IFoodController } from "../types/IFoodController";
import { Categoria } from "../model/FoodCategory";

export default class FoodController implements IFoodController{

    private db: Database = new Database();

    public getNewFood(id: number, nome: string, descricao: string, preco: number, peso: number, sabor: Categoria): Food{
        return new Food(id, nome, descricao, preco, peso, sabor);
    }

    public addFood(food: Food): void{
        this.db.addNewFood(food);
    }
    
    public listFood(): void{
        console.log(this.db.getFoodSize());
    }

    public getAllFoods(): Food[]{
        return this.db.getAllFoods();
    }

    public removeFood(id: number): void{
        this.db.removeFood(id);
    }

    
    
}
