import { IPost, IPostDetail, createPosts, createPostById } from './interface';
import { IAuthor } from '../author/interface';
import { Posts, Authors } from '../../models';

// The service class serves to implement our CRUDS or our Business Rules

class Post implements IPost {
    public id: number;
    public title: string;
    public text: string;
    public authorId?: number;
    public author?: IAuthor[];

    constructor () {}

    create (post: any) {
      return Posts.create(post);
    }

    getAll (): Promise<IPost[]> {
      return Posts.findAll({
        order: ['title'],
        include: [{ model: Authors }]
      })
        .then(createPosts);
    }

    getById (id: number): Promise<IPostDetail> {
      return Posts.findOne({
        where: { id },
        order: ['title'],
        include: [{ model: Authors }]
      })
        .then(createPostById);
    }

    update (id: number, post: any) {
      return Posts.update(post, {
        where: { id },
        fields: ['title', 'text', 'authorid'],
        hooks: true,
        individualHooks: true
      });
    }

    delete (id: number) {
      return Posts.destroy({
        where: { id }
      });
    }
}

export default new Post();
