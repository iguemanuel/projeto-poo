"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
class FoodController {
    constructor() {
        this.db = new Database_1.default();
    }
    addFood(food) {
        this.db.addNewFood(food);
    }
    listFood() {
        console.log(this.db.getFoodSize());
    }
    getAllFoods() {
        return this.db.getAllFoods();
    }
}
exports.default = FoodController;
