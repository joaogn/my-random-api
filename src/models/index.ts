import { Sequelize } from 'sequelize-typescript';
import { Users } from './user';
import { Posts } from './post';
import { Authors } from './author';
const config = require('../config/database');

'use strict';

// This code was created by sequelize init, it is responsible for configuring and starting the sequelize and its database.

export const sequelize = new Sequelize(config.db, config.username, config.password, config);

sequelize.addModels([Users, Posts, Authors]);

export { Users, Posts, Authors };
