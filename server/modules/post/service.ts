import {IPost, IPostDetail, createPost, createPosts, createPostById} from './interface';
import * as Bluebird from 'bluebird';
import { IAuthor } from '../author/interface';
const model = require('../../models');


//The service class serves to implement our CRUDS or our Business Rules

class Post implements IPost{
    public id: number;
    public title: string;
    public text: string;
    public AuthorId?: number;
    public Author?: IAuthor[];

    constructor(){}

    create( post: any){
        return model.Post.create(post);
    }

    getAll(): Bluebird<IPost[]>{
        return model.Post.findAll({
            order: ['title'],
            include: [{model: model.Author}]
        })
        .then(createPosts);
    }

    getById(id: number):  Bluebird<IPostDetail>{
        return model.Post.findOne({
            where: {id},
            order: ['title'],
            include: [{model: model.Author}]
        })
        .then(createPostById);
    }

    update(id: number, post: any){
        return model.Post.update(post,{
            where:{id},
            fields: ['title','text','authorid'],
            hooks: true,
            individualHooks: true
        });
    }

    delete(id: number){
        return model.Post.destroy({
            where:{id}
        });
    }

}

export default new Post();
