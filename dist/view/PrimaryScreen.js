"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const FoodController_1 = __importDefault(require("../controller/FoodController"));
const Food_1 = require("../model/Food");
const FoodCategory_1 = require("../model/FoodCategory");
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
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
// Função principal para criar um novo alimento
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obter dados do usuário
        const id = parseInt(yield askQuestion('Digite o ID do alimento: '));
        const nome = yield askQuestion('Digite o nome do alimento: ');
        const descricao = yield askQuestion('Digite a descrição do alimento: ');
        const preco = parseFloat(yield askQuestion('Digite o preço do alimento: '));
        const peso = parseFloat(yield askQuestion('Digite o peso do alimento: '));
        const saborInput = yield askQuestion('Digite o sabor do alimento (Salgado/Doce): ');
        // Validar e converter o sabor
        const sabor = saborInput === 'Salgado' ? FoodCategory_1.Categoria.Salgado : FoodCategory_1.Categoria.Doce;
        // Criar instância de Food
        const newFood = new Food_1.Food(id, nome, descricao, preco, peso, sabor);
        // Instanciar o controller e adicionar o alimento
        const foodController = new FoodController_1.default();
        foodController.addFood(newFood);
        // Listar todos os alimentos
        console.log('Alimentos cadastrados:');
        console.log(foodController.getAllFoods());
    }
    catch (error) {
        console.error('Ocorreu um erro:', error);
    }
    finally {
        // Fechar a interface readline
        rl.close();
    }
});
// Executar a função principal
main();
