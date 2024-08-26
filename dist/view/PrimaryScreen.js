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
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const FoodCategory_1 = require("../model/FoodCategory");
class PrimaryScreen {
    constructor(foodController) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.foodController = foodController;
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const option = yield this.askQuestion('\nEscolha uma opção:\n1. Cadastrar alimento\n2. Listar alimentos\n3. Remover alimento\n4. Encerrar\n');
                switch (option) {
                    case '1':
                        yield this.createFood();
                        break;
                    case '2':
                        yield this.listFoods();
                        break;
                    case '3':
                        yield this.removeFood();
                        break;
                    case '4':
                        console.log('Encerrando o programa.');
                        this.rl.close();
                        return;
                    default:
                        console.log('Opção inválida. Tente novamente.');
                }
            }
        });
    }
    // Ler a entrada do usuário
    askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
    // Validar e garantir que o ID é um número
    askForValidId() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const idInput = yield this.askQuestion('Digite o ID do alimento: ');
                const id = parseInt(idInput);
                if (!isNaN(id)) {
                    return id;
                }
                else {
                    console.log('Erro: O ID deve ser um número. Tente novamente.');
                }
            }
        });
    }
    // Função para validar o sabor (Categoria)
    askForValidCategoria() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const saborInput = yield this.askQuestion('Digite o sabor do alimento (Salgado/Doce): ');
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
    }
    // Criar um novo alimento
    createFood() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.askForValidId();
            const nome = yield this.askQuestion('Digite o nome do alimento: ');
            const descricao = yield this.askQuestion('Digite a descrição do alimento: ');
            const preco = parseFloat(yield this.askQuestion('Digite o preço do alimento R$: '));
            const peso = parseFloat(yield this.askQuestion('Digite o peso do alimento em KG: '));
            // Chamando a função de validação de sabor
            const sabor = yield this.askForValidCategoria();
            // Criando o novo alimento com todos os parâmetros
            const newFood = this.foodController.getNewFood(id, nome, descricao, preco, peso, sabor);
            this.foodController.addFood(newFood);
            console.log('Alimento cadastrado com sucesso!');
        });
    }
    // Listar alimentos
    listFoods() {
        return __awaiter(this, void 0, void 0, function* () {
            const option = yield this.askQuestion('Digite 1 para listar todos ou 2 para listar por ID: ');
            if (option === '1') {
                console.log('Alimentos cadastrados:');
                console.log(this.foodController.getAllFoods());
            }
            else if (option === '2') {
                const id = yield this.askForValidId();
                const food = this.foodController.getAllFoods().find(f => f.getId() === id);
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
    }
    // Remover alimentos
    removeFood() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.askForValidId();
            const food = this.foodController.getAllFoods().find(f => f.getId() === id);
            if (food) {
                this.foodController.removeFoodById(id);
                console.log('Alimento removido com sucesso!');
            }
            else {
                console.log('Alimento não encontrado.');
            }
        });
    }
}
exports.default = PrimaryScreen;
