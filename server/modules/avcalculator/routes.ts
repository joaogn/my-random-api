import {Request, Response} from 'express';
import avCalculatorController from './controller'



//Class with methods for answering route calls

class avCalculatorRoutes {

    constructor(){}

    getRwyInUse(req: Request, res: Response){
        return avCalculatorController.getRwyInUse(req,res);
    }



}

export default new avCalculatorRoutes();