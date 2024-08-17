import Database from "../db/Database";
import { Food } from "../model/Food";

export default class FoodController{

    private db: Database = new Database();

    public addFood(food: Food): void{
        this.db.addNewFood(food);
    }
    
    public listFood(): void{
        console.log(this.db.getFoodSize());
    }

    public getAllFoods(): Food[]{
        return this.db.getAllFoods();
    }

    
}
