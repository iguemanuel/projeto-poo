"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = "Erro personalizado";
    }
    sayError() {
        console.log(`Erro ${this.code}: ${this.message}`);
    }
}
exports.default = CustomError;
