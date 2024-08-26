import Database from "../db/Database";
import { Food } from "../model/Food";
import { IFoodController } from "../types/IFoodController";
import { Categoria } from "../model/FoodCategory";
import CustomError from "../types/CustomError";

export default class FoodController implements IFoodController {

    private db: Database = new Database();

    // Sobrecarga do método getNewFood
    public getNewFood(id: number, nome: string, descricao: string, preco: number, peso: number): Food;
    public getNewFood(id: number, nome: string, descricao: string, preco: number, peso: number, sabor: Categoria): Food;

    // Implementação com validação usando try-catch
    public getNewFood(id: number, nome: string, descricao: string, preco: number, peso: number, sabor?: Categoria): Food {
        try {
            if (preco <= 0) {
                throw new CustomError(402, 'Erro: O preço deve ser maior que zero.');
            }

            if (peso <= 0) {
                throw new CustomError(402, 'Erro: O peso deve ser maior que zero.');
            }

            if (sabor === undefined) {
                throw new CustomError(402, 'Erro: O sabor deve ser definido.');
            }

        } catch (error) {
            if (error instanceof CustomError) {
                error.sayError();
            }
            throw error;  // Relança o erro após o tratamento
        }

        return new Food(id, nome, descricao, preco, peso, sabor);
    }

    public addFood(food: Food): void {
        if (this.db.getAllFoods().some(f => f.getId() === food.getId())) {
            throw new CustomError(400, 'Erro: O ID já existe.');
        }
        this.db.addNewFood(food);
    }

    public listFood(): void {
        console.log(this.db.getFoodSize());
    }

    public getAllFoods(): Food[] {
        return this.db.getAllFoods(); 
    }

    public getAllFoodsFormatted(): string[] {
        return this.db.getAllFoods().map(food => food.getFoodFormatado());
    }
    
    public removeFoodById(id: number): void {
        this.db.removeFoodById(id); // Chama o método do banco de dados para remover o alimento
        console.log(`Alimento com ID ${id} foi excluído com sucesso.`);
    }
    
}

