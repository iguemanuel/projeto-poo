import * as readline from 'readline';
import FoodController from '../controller/FoodController';
import { Food } from '../model/Food';
import { Categoria } from '../model/FoodCategory';

// export default class PrimaryScreen {

//   private foodController: FoodController;
//   private rl: readline.Interface;

//   constructor(foodController: FoodController) {
//     this.foodController = foodController;
//     this.rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//   }

//   public async showMenu(): Promise<void> {
//     let showMenu = false; 

//     while (!showMenu){
//       const choice = await this.prompt(
//         '1. Adicionar nova comida\n2. Listar comida\n3. Sair\n'
//       );
      
//       switch (choice) {
//         case '1':
//           let Food: Food = {this.foodController.addFood()};
//           await this.
//     }

// }



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

// Função principal para criar um novo alimento
const main = async () => {
    try {
        // Obter dados do usuário
        const id = parseInt(await askQuestion('Digite o ID do alimento: '));
        const nome = await askQuestion('Digite o nome do alimento: ');
        const descricao = await askQuestion('Digite a descrição do alimento: ');
        const preco = parseFloat(await askQuestion('Digite o preço do alimento: '));
        const peso = parseFloat(await askQuestion('Digite o peso do alimento: '));
        const saborInput = await askQuestion('Digite o sabor do alimento (Salgado/Doce): ');

        // Validar e converter o sabor
        const sabor = saborInput === 'Salgado' ? Categoria.Salgado : Categoria.Doce;

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
