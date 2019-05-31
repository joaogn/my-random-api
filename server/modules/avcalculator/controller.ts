import { Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import Handlers from '../../api/resposeHandlers'
import avCalculator from './service';

//the controler class is used to make the connection between the UserRouter class and the Service class 
//And returns the result of the promisses of the service class methods.

class avCalculatorController {



    constructor(){};

    getRwyInUse(req: Request, res: Response){

        avCalculator
        .runwayInUse()
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.onError, res, 'Error Calculate Runway in Use'));



    }

}

export default new avCalculatorController();