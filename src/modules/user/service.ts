import { IUser, createUser, createUsers } from './interface';
// const model = require('../../models');
import { Users } from '../../models';

// The service class serves to implement our CRUDS or our Business Rules

class User implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    public create (user: any) {
      return Users.create(user);
    }

    public getAll (): Promise<IUser[]> {
      return Users.findAll({
        order: ['name']
      })
        .then(createUsers);
    }

    public getById (id: number): Promise<IUser> {
      return Users.findOne({
        where: { id }
      })
        .then(createUser);
    }

    public getbyEmail (email: string): Promise<IUser> {
      return Users.findOne({
        where: { email }
      })
        .then(createUser);
    }

    public update (id: number, user: any) {
      return Users.update(user, {
        where: { id },
        fields: ['name', 'email', 'password'],
        hooks: true,
        individualHooks: true
      });
    }

    public delete (id: number) {
      return Users.destroy({
        where: { id }
      });
    }
}

export default new User();
