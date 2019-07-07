'use strict';

import express from 'express';

import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import Handlers from './resposeHandlers';
import Auth from '../auth';
import graphqlHTTP from 'express-graphql';
import { createSchema } from '../graphql/createSchema';

// class responsible for setting up and starting routes the API

class Api {
    public express: express.Application;

    constructor () {
      this.express = express();
      this.middleware();
    }

    private async middleware () {
      this.express.use(morgan('dev'));
      this.express.use(bodyParser.urlencoded({ extended: true }));
      this.express.use(bodyParser.json());
      this.express.use(Handlers.errorHandlerApi);
      this.express.use(Auth.config().initialize());
      const schema = await createSchema();
      this.express.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
      }));
      this.router(this.express, Auth);
    }

    private router (app: express.Application, auth: any): void{
      Routes.initRoutes(app, auth);
    }
}

export default new Api().express;
