export default class CustomError extends Error {
    constructor(public code: number, message: string) {
        super(message);
        this.name = "Erro personalizado";
    }

    sayError() {
        console.log(`Erro ${this.code}: ${this.message}`);
    }
}
