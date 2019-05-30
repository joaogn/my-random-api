import { Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';
import Handlers from '../../api/resposeHandlers'
import Author from './service';

//the controler class is used to make the connection between the UserRouter class and the Service class 
//And returns the result of the promisses of the service class methods.

class AuthorController {



    constructor(){};

    getAll(req: Request, res: Response){

        Author
        .getAll()
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.onError, res, 'Error get all author'));



    }

    createAuthor(req: Request, res: Response){

        Author
        .create(req.body)
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.dbErrorHandler, res))
        .catch(_.partial(Handlers.onError, res, 'Error create new author'));

    }

    getById(req: Request, res: Response){

        
        Author
        .getById(parseInt(req.params.id))
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.onError, res, 'Error author not find'));
  

    }

    updateAuthor(req: Request, res: Response){

        Author
        .update(parseInt(req.params.id),req.body)
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.onError, res, 'Error update author'));
    }

    deleteAuthor(req: Request, res: Response){

        Author
        .delete(parseInt(req.params.id))
        .then(_.partial(Handlers.onSucess, res))
        .catch(_.partial(Handlers.onError, res, 'Error delete author'));

    }


}

export default new AuthorController();