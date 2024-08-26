"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor() {
        this.foods = [];
    }
    addNewFood(food) {
        this.foods.push(food);
    }
    removeFood(index) {
        this.foods.splice(index, 1);
    }
    getFoodSize() {
        return this.foods.length;
    }
    getAllFoods() {
        return [...this.foods];
    }
    removeFoodById(id) {
        const index = this.foods.findIndex(food => food.getId() === id);
        if (index === -1) {
            throw new Error(`Alimento com ID ${id} não encontrado.`);
        }
        this.foods.splice(index, 1);
    }
}
exports.default = Database;
