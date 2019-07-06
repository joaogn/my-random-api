import Author from '../../src/modules/author/service';
import { Posts, Authors } from '../../src/models';

describe('Author Unit test controller', () => {
  const authorDefault = {
    id: 1,
    name: 'Default Author'
  };

  const postDefault = {
    id: 1,
    title: 'Title Post',
    text: 'Text Post',
    AuthorId: authorDefault.id

  };

  // before each test is checked the database synchronization,
  // the whole database is erased, and a known user is created to maintain good practices
  beforeEach(async () => {
    await Authors.destroy({ where: {} });
    await Posts.destroy({ where: {} });
    await Authors.create(authorDefault);
    await Posts.create(postDefault);
  });

  describe('Method Create', () => {
    it('Create new author', () => {
      const newAuthor = {
        id: 2,
        name: 'New Author'
      };

      return Author.create(newAuthor)
        .then(data => {
          expect(data.name).toBe(newAuthor.name);
        });
    });
  });

  describe('Method Update', () => {
    it('Update author', () => {
      const authorUpdate = {
        name: 'new Author'
      };

      return Author.update(authorDefault.id, authorUpdate).then(data => {
        console.log(data[0]);
        expect(data[0]).toBe(1);
      });
    });
  });

  describe('Method Get Authors', () => {
    it('Return all Author', () => {
      return Author.getAll().then(data => {
        expect(data[0].id).toBe(authorDefault.id);
      });
    });
  });

  describe('Method getById', () => {
    it('Return id author', () => {
      return Author.getById(authorDefault.id).then(data => {
        expect(data.name).toBe(authorDefault.name);
      });
    });
  });

  describe('Method Delete', () => {
    it('Delete author', () => {
      return Author.delete(authorDefault.id).then(data => {
        expect(data).toBe(1);
      });
    });
  });
});
