import {IAuthor, IAuthorDetail, createAuthor, createAuthors, createAuthorById} from './interface';
import * as Bluebird from 'bluebird';
const model = require('../../models');


//The service class serves to implement our CRUDS or our Business Rules

class Author implements IAuthor{
    public id: number;
    public name: string;

    constructor(){}

    create( author: any){
        return model.Author.create(author);
    }

    getAll(): Bluebird<IAuthor[]>{
        return model.Author.findAll({
            order: ['name'],
            include: [{model: model.Post}]
        })
        .then(createAuthors);
    }

    getById(id: number):  Bluebird<IAuthorDetail>{
        return model.Author.findOne({
            where: {id},
            order: ['name'],
            include: [{model: model.Post}]
        })
        .then(createAuthorById);
    }

    update(id: number, author: any){
        return model.Author.update(author,{
            where:{id},
            fields: ['name'],
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return model.Author.destroy({
            where:{id}
        });
    }

}

export default new Author();
