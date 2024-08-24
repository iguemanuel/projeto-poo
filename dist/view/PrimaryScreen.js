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
const FoodCategory_1 = require("../model/FoodCategory");
const CustomError_1 = __importDefault(require("../types/CustomError"));
// Criar interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Função principal que gerencia o mini terminal
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const foodController = new FoodController_1.default();
    while (true) {
        const option = yield askQuestion('\nEscolha uma opção:\n1. Cadastrar alimento\n2. Listar alimentos\n3. Remover alimento\n4. Encerrar\n');
        switch (option) {
            case '1':
                yield createFood(foodController);
                break;
            case '2':
                yield listFoods(foodController);
                break;
            case '3':
                yield removeFood(foodController);
                break;
            case '4':
                console.log('Encerrar');
                rl.close();
                return;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    }
});
// Função para ler a entrada do usuário
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
// Função para validar e garantir que o ID é um número
const askForValidId = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const idInput = yield askQuestion('Digite o ID do alimento: ');
        const id = parseInt(idInput);
        if (!isNaN(id)) {
            return id;
        }
        else {
            console.log('Erro: O ID deve ser um número. Tente novamente.');
        }
    }
});
// Função para validar o sabor (Categoria)
const askForValidCategoria = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const saborInput = yield askQuestion('Digite o sabor do alimento (Salgado/Doce): ');
        if (saborInput.toLowerCase() === 'salgado') {
            return FoodCategory_1.Categoria.Salgado;
        }
        else if (saborInput.toLowerCase() === 'doce') {
            return FoodCategory_1.Categoria.Doce;
        }
        else {
            console.log('Erro: O sabor deve ser "Salgado" ou "Doce". Tente novamente.');
        }
    }
});
// Função para criar um novo alimento
const createFood = (foodController) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield askForValidId();
    // Verifica se o ID já existe
    if (foodController.getAllFoods().some(f => f.getId() === id)) {
        throw new CustomError_1.default(400, 'Erro: O ID já existe.');
    }
    const nome = yield askQuestion('Digite o nome do alimento: ');
    const descricao = yield askQuestion('Digite a descrição do alimento: ');
    const preco = parseFloat(yield askQuestion('Digite o preço do alimento: '));
    const peso = parseFloat(yield askQuestion('Digite o peso do alimento: '));
    const sabor = yield askForValidCategoria();
    const newFood = foodController.getNewFood(id, nome, descricao, preco, peso, sabor);
    foodController.addFood(newFood);
    console.log('Alimento cadastrado com sucesso!');
});
// Função para listar alimentos
const listFoods = (foodController) => __awaiter(void 0, void 0, void 0, function* () {
    const option = yield askQuestion('Digite 1 para listar todos ou 2 para listar por ID: ');
    if (option === '1') {
        console.log('Alimentos cadastrados:');
        console.log(foodController.getAllFoods());
    }
    else if (option === '2') {
        const id = yield askForValidId();
        const food = foodController.getAllFoods().find(f => f.getId() === id);
        if (food) {
            console.log(food.getFoodFormatado());
        }
        else {
            console.log('Alimento não encontrado.');
        }
    }
    else {
        console.log('Opção inválida.');
    }
});
// Função para remover alimentos
const removeFood = (foodController) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield askForValidId();
    const food = foodController.getAllFoods().find(f => f.getId() === id);
    if (food) {
        foodController.removeFood(id);
        console.log('Alimento removido com sucesso!');
    }
    else {
        console.log('Alimento não encontrado.');
    }
});
// Função para tratar erros personalizados
const handleError = (error) => {
    if (error instanceof CustomError_1.default) {
        error.sayError();
    }
    else {
        console.error('Erro inesperado:', error);
    }
};
// Executar a função principal
main();
