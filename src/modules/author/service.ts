import { IAuthor, IAuthorDetail, createAuthors, createAuthorById } from './interface';
import { Authors, Posts } from '../../models';

// The service class serves to implement our CRUDS or our Business Rules

class Author implements IAuthor {
    public id: number;
    public name: string;

    constructor () {}

    create (author: any) {
      return Authors.create(author);
    }

    getAll (): Promise<IAuthor[]> {
      return Authors.findAll({
        order: ['name'],
        include: [{ model: Posts }]
      })
        .then(createAuthors);
    }

    getById (id: number): Promise<IAuthorDetail> {
      return Authors.findOne({
        where: { id },
        order: ['name'],
        include: [{ model: Posts }]
      })
        .then(createAuthorById);
    }

    update (id: number, author: any) {
      return Authors.update(author, {
        where: { id },
        fields: ['name'],
        hooks: true,
        individualHooks: true
      });
    }

    delete (id: number) {
      return Authors.destroy({
        where: { id }
      });
    }
}

export default new Author();
