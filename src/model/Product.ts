export default abstract class Product{
    private id: number;
    private nome: string;
    private preco: number;

    constructor(id: number, nome: string, preco: number){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }

    public getId(): number{
        return this.id;
    }
    
    public getNome(): string{     
        return this.nome;
    } 

    public setNome(nome: string): void{
        this.nome = nome;
    }

    public getPreco(): number{
        return this.preco;
    }

    public setPreco(preco: number): void{
        this.preco = preco;
    }
}