import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './user/resolvers';

export const createSchema = () => {
  return buildSchema({
    resolvers: [UserResolvers]
  });
};
