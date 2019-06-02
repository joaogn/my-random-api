import {Request, Response} from 'express';
import avCalculatorController from './controller'



//Class with methods for answering route calls

class avCalculatorRoutes {

    constructor(){}

    getRwyInUse(req: Request, res: Response){
        return avCalculatorController.getRwyInUse(req,res);
    }

    getIdealOfDescent(req: Request, res: Response){
        return avCalculatorController.idealOfDescent(req,res);
    }

    gethpaToInhg(req: Request, res: Response){
        return avCalculatorController.hpaToInhg(req,res);
    }

    getinhgToHpa(req: Request, res: Response){
        return avCalculatorController.inhgToHpa(req,res);
    }



}

export default new avCalculatorRoutes();