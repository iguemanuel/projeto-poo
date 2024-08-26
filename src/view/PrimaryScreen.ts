import * as readline from 'readline';
import FoodController from '../controller/FoodController';
import { Categoria } from '../model/FoodCategory';

export default class PrimaryScreen {
    private foodController: FoodController;
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    constructor(foodController: FoodController) {
        this.foodController = foodController;
    }

    public async main() {
        while (true) {
            const option = await this.askQuestion(
                '\nEscolha uma opção:\n1. Cadastrar alimento\n2. Listar alimentos\n3. Remover alimento\n4. Encerrar\n'
            );

            switch (option) {
                case '1':
                    await this.createFood();
                    break;
                case '2':
                    await this.listFoods();
                    break;
                case '3':
                    await this.removeFood();
                    break;
                case '4':
                    console.log('Encerrando o programa.');
                    this.rl.close();
                    return;
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }

    // Ler a entrada do usuário
    private askQuestion(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    // Validar e garantir que o ID é um número
    private async askForValidId(): Promise<number> {
        while (true) {
            const idInput = await this.askQuestion('Digite o ID do alimento: ');
            const id = parseInt(idInput);

            if (!isNaN(id)) {
                return id;
            } else {
                console.log('Erro: O ID deve ser um número. Tente novamente.');
            }
        }
    }

    // Função para validar o sabor (Categoria)
    private async askForValidCategoria(): Promise<Categoria> {
        while (true) {
            const saborInput = await this.askQuestion('Digite o sabor do alimento (Salgado/Doce): ');

            if (saborInput.toLowerCase() === 'salgado') {
                return Categoria.Salgado;
            } else if (saborInput.toLowerCase() === 'doce') {
                return Categoria.Doce;
            } else {
                console.log('Erro: O sabor deve ser "Salgado" ou "Doce". Tente novamente.');
            }
        }
    }

    // Criar um novo alimento
    private async createFood() {
        const id = await this.askForValidId();
        const nome = await this.askQuestion('Digite o nome do alimento: ');
        const descricao = await this.askQuestion('Digite a descrição do alimento: ');
        const preco = parseFloat(await this.askQuestion('Digite o preço do alimento R$: '));
        const peso = parseFloat(await this.askQuestion('Digite o peso do alimento em KG: '));

        // Chamando a função de validação de sabor
        const sabor = await this.askForValidCategoria(); 

        // Criando o novo alimento com todos os parâmetros
        const newFood = this.foodController.getNewFood(id, nome, descricao, preco, peso, sabor);
        this.foodController.addFood(newFood);

        console.log('Alimento cadastrado com sucesso!');
    }

    // Listar alimentos
    private async listFoods() {
        const option = await this.askQuestion('Digite 1 para listar todos ou 2 para listar por ID: ');

        if (option === '1') {
            console.log('Alimentos cadastrados:');
            console.log(this.foodController.getAllFoods());
        } else if (option === '2') {
            const id = await this.askForValidId();
            const food = this.foodController.getAllFoods().find(f => f.getId() === id);
            if (food) {
                console.log(food.getFoodFormatado());
            } else {
                console.log('Alimento não encontrado.');
            }
        } else {
            console.log('Opção inválida.');
        }
    }

    // Remover alimentos
    private async removeFood() {
        const id = await this.askForValidId();
        const food = this.foodController.getAllFoods().find(f => f.getId() === id);

        if (food) {
            this.foodController.removeFoodById(id);
            console.log('Alimento removido com sucesso!');
        } else {
            console.log('Alimento não encontrado.');
        }
    }
}
