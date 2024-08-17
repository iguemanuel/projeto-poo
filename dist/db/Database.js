"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor() {
        this.comidas = [];
    }
    addNewFood(food) {
        this.comidas.push(food);
    }
    removeFood(index) {
        this.comidas.splice(index, 1);
    }
    getFoodSize() {
        return this.comidas.length;
    }
    getAllFoods() {
        return [...this.comidas];
    }
}
exports.default = Database;
