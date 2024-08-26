import * as readline from 'readline';
import FoodController from '../controller/FoodController';
import { Categoria } from '../model/FoodCategory';
import CustomError from '../types/CustomError';

// interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// mini terminal gerencial
const main = async () => {
    const foodController = new FoodController();

    while (true) {
        const option = await askQuestion(
            '\nEscolha uma opção:\n1. Cadastrar alimento\n2. Listar alimentos\n3. Remover alimento\n4. Encerrar\n'
        );

        switch (option) {
            case '1':
                await createFood(foodController);
                break;
            case '2':
                await listFoods(foodController);
                break;
            case '3':
                await removeFood(foodController);
                break;
            case '4':
                console.log('Encerrar');
                rl.close();
                return;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    }
};

// Ler a entrada do usuário
const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Validar e garantir que o ID é um número
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

        if (saborInput.toLowerCase() === 'salgado') {
            return Categoria.Salgado;
        } else if (saborInput.toLowerCase() === 'doce') {
            return Categoria.Doce;
        } else {
            console.log('Erro: O sabor deve ser "Salgado" ou "Doce". Tente novamente.');
        }
    }  
};

// criar um novo alimento
const createFood = async (foodController: FoodController) => {
    const id = await askForValidId();
    const nome = await askQuestion('Digite o nome do alimento: ');
    const descricao = await askQuestion('Digite a descrição do alimento: ');
    const preco = parseFloat(await askQuestion('Digite o preço do alimento R$: '));
    const peso = parseFloat(await askQuestion('Digite o peso do alimento me KG): '));
    
    // Chamando a função de validação de sabor
    const sabor = await askForValidCategoria(); 

    // Criando o novo alimento com todos os parâmetros
    const newFood = foodController.getNewFood(id, nome, descricao, preco, peso, sabor);
    foodController.addFood(newFood);

    console.log('Alimento cadastrado com sucesso!');
};

// listar alimentos
const listFoods = async (foodController: FoodController) => {
    const option = await askQuestion('Digite 1 para listar todos ou 2 para listar por ID: ');

    if (option === '1') {
        console.log('Alimentos cadastrados:');
        console.log(foodController.getAllFoods());
    } else if (option === '2') {
        const id = await askForValidId();
        const food = foodController.getAllFoods().find(f => f.getId() === id);
        if (food) {
            console.log(food.getFoodFormatado());
        } else {
            console.log('Alimento não encontrado.');
        }
    } else {
        console.log('Opção inválida.');
    }
};

// remover alimentos
const removeFood = async (foodController: FoodController) => {
    const id = await askForValidId();
    const food = foodController.getAllFoods().find(f => f.getId() === id);

    if (food) {
        foodController.removeFood(id);
        console.log('Alimento removido com sucesso!');
    } else {
        console.log('Alimento não encontrado.');
    }
};

main();
