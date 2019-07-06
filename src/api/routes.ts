'use strict';

import { Application } from 'express';
import UserController from '../modules/user/controller';
import TokenRoutes from '../modules/auth/auth';
import AuthorCrontoller from '../modules/author/controller';
import PostCrontoller from '../modules/post/controller';
import AvCalculatorCrontoller from '../modules/avcalculator/controller';

// Class responsible for starting the API routes, request authentication
// and call the modules responsible for executing the route

class Routes {
  public initRoutes (app: Application, auth: any): void{
    app.route('/api/users/all').get(UserController.getAll);
    app.route('/api/users/create').post(UserController.createUser);
    app.route('/api/users/:id').all(auth.config().authenticate()).get(UserController.getById);
    app.route('/api/users/:id/update').all(auth.config().authenticate()).put(UserController.updateUser);
    app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(UserController.deleteUser);
    app.route('/token').post(TokenRoutes.auth);

    app.route('/api/author/all').get(AuthorCrontoller.getAll);
    app.route('/api/author/create').post(AuthorCrontoller.createAuthor);
    app.route('/api/author/:id').get(AuthorCrontoller.getById);
    app.route('/api/author/:id/update').put(AuthorCrontoller.updateAuthor);
    app.route('/api/author/:id/destroy').delete(AuthorCrontoller.deleteAuthor);

    app.route('/api/post/all').get(PostCrontoller.getAll);
    app.route('/api/post/create').post(PostCrontoller.createPost);
    app.route('/api/post/:id').get(PostCrontoller.getById);
    app.route('/api/post/:id/update').put(PostCrontoller.updatePost);
    app.route('/api/post/:id/destroy').delete(PostCrontoller.deletePost);

    app.route('/api/avcalculator/getrwyinuse/:rwy1/:rwy2/:wind/:dec/:dir').get(AvCalculatorCrontoller.getRwyInUse);
    app.route('/api/avcalculator/idealofdescent/:crzAlt/:targetAlt/:descentRate/:speed').get(AvCalculatorCrontoller.idealOfDescent);
    app.route('/api/avcalculator/hpatoinhg/:hpa').get(AvCalculatorCrontoller.hpaToInhg);
    app.route('/api/avcalculator/inhgtohpa/:inhg').get(AvCalculatorCrontoller.inhgToHpa);
  }
}

export default new Routes();
