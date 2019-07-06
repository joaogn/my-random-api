import Post from '../../src/modules/post/service';
import { Posts, Authors } from '../../src/models';

describe('Post Unit test controller', () => {
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
    it('Create new Post', () => {
      const newPost = {
        id: 2,
        title: 'new Title Post',
        text: 'new Text Post',
        AuthorId: authorDefault.id

      };

      return Post.create(newPost)
        .then(data => {
          expect(data.id).toBe(newPost.id);
        });
    });
  });

  describe('Method Update', () => {
    it('Update post', () => {
      const updatePost = {
        title: 'Update Title Post',
        text: 'Update Text Post',
        authorid: authorDefault.id

      };

      return Post.update(postDefault.id, updatePost).then(data => {
        console.log(data[0]);
        expect(data[0]).toBe(1);
      });
    });
  });

  describe('Method Get Posts', () => {
    it('Return all Pots', () => {
      return Post.getAll().then(data => {
        expect(data[0].id).toBe(postDefault.id);
      });
    });
  });

  describe('Method getById', () => {
    it('Return id post', () => {
      return Post.getById(postDefault.id).then(data => {
        expect(data.text).toBe(postDefault.text);
      });
    });
  });

  describe('Method Delete', () => {
    it('Delete post', () => {
      return Post.delete(postDefault.id).then(data => {
        expect(data).toBe(1);
      });
    });
  });
});
