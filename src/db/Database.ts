import { Food } from "../model/Food";
export default class Database{

    private foods: Food[] = [];

    public addNewFood(food: Food): void{
        this.foods.push(food);
    }

    public removeFood(index: number): void{
        this.foods.splice(index, 1);
    }

    public getFoodSize(): number{
        return this.foods.length;
    }

    public getAllFoods(): Food[] {
        return [...this.foods];
    }

    public removeFoodById(id: number): void {
        const index = this.foods.findIndex(food => food.getId() === id);
        if (index === -1) {
            throw new Error(`Alimento com ID ${id} não encontrado.`);
        }
        this.foods.splice(index, 1);
    }
    
}