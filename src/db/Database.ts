import { Food } from "../model/Food";
export default class Database{

    private comidas: Food[] = [];

    public addNewFood(food: Food): void{
        this.comidas.push(food);
    }

    public removeFood(index: number): void{
        this.comidas.splice(index, 1);
    }

    public getFoodSize(): number{
        return this.comidas.length;
    }

    public getAllFoods(): Food[] {
        return [...this.comidas];
    }
}