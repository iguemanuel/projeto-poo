import Product from "./Product";
import { Categoria } from "./FoodCategory";

export class Food extends Product {
    private peso: number;
    private sabor: Categoria;

    constructor(id: number, nome: string, descricao: string, preco: number, peso: number, sabor: Categoria) {
        super(id, nome, preco); 
        this.peso = peso;
        this.sabor = sabor;
    }

    public getPeso(): number {
        return this.peso;
    }

    public setPeso(peso: number): void {
        this.peso = peso;
    }

    public getSabor(): Categoria {
        return this.sabor;
    }

    public setSabor(sabor: Categoria): void {
        this.sabor = sabor;
    }
}
