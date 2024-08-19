import * as readline from 'readline';
import FoodController from '../controller/FoodController';
import { Food } from '../model/Food';
import { Categoria } from '../model/FoodCategory';

// Criar interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para ler a entrada do usuário
const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Função para validar e garantir que o ID é um número
const askForValidId = async (): Promise<number> => {
    while (true) {
        const idInput = await askQuestion('Digite o ID do alimento: ');
        const id = parseInt(idInput);

        if (!isNaN(id)) {
            return id;
        } else {
            console.log('Erro: O ID deve ser um número. Tente novamente.');
        }
    }
};

// Função para validar o sabor (Categoria)
const askForValidCategoria = async (): Promise<Categoria> => {
    while (true) {
        const saborInput = await askQuestion('Digite o sabor do alimento (Salgado/Doce): ');

        if (saborInput === 'Salgado') {
            return Categoria.Salgado;
        } else if (saborInput === 'Doce') {
            return Categoria.Doce;
        } else {
            console.log('Erro: O sabor deve ser "Salgado" ou "Doce". Tente novamente.');
        }
    }
};

// Função principal para criar um novo alimento
const main = async () => {
    try {
        // Obter dados do usuário com validação
        const id = await askForValidId();
        const nome = await askQuestion('Digite o nome do alimento: ');
        const descricao = await askQuestion('Digite a descrição do alimento: ');
        const preco = parseFloat(await askQuestion('Digite o preço do alimento: '));
        const peso = parseFloat(await askQuestion('Digite o peso do alimento: '));
        const sabor = await askForValidCategoria();

        // Criar instância de Food
        const newFood = new Food(id, nome, descricao, preco, peso, sabor);

        // Instanciar o controller e adicionar o alimento
        const foodController = new FoodController();
        foodController.addFood(newFood);

        // Listar todos os alimentos
        console.log('Alimentos cadastrados:');
        console.log(foodController.getAllFoods());
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    } finally {
        // Fechar a interface readline
        rl.close();
    }
};

// Executar a função principal
main();
