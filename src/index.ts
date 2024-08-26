import PrimaryScreen from './view/PrimaryScreen';
import FoodController from './controller/FoodController';

// Iniciar a aplicação
const startApp = async () => {
    const foodController = new FoodController();
    const primaryScreen = new PrimaryScreen(foodController);
    
    await primaryScreen.main(); // Chama a função main de PrimaryScreen
};

// Executar a função startApp
startApp();
