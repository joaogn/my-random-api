import request from 'supertest';
import app from '../../src/api/api';
import HTTPStatus from 'http-status';
import { Posts, Authors } from '../../src/models';

describe('Post Integration Tests', () => {
  const authorDefault = {
    id: 1,
    name: 'Default Author'
  };

  const postTest = {
    id: 100,
    title: 'Title Test Post',
    text: 'Text Test Post',
    AuthorId: authorDefault.id
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

  describe('GET /api/post/all', () => {
    it('Return all posts on json', done => {
      request(app)
        .get('/api/post/all')
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload[0].title).toBe(postDefault.title);
          expect(res.body.payload[0].text).toBe(postDefault.text);
          done(error);
        });
    });
  });

  describe('GET /api/post/:id', () => {
    it('Return post on json', done => {
      request(app)
        .get(`/api/post/${postDefault.id}`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.id).toBe(postDefault.id);
          done(error);
        });
    });
  });

  describe('POST /api/post/create ', () => {
    it('Create new post', done => {
      const newPost = {
        id: 2,
        title: 'Title New Post',
        text: 'Text New Post',
        AuthorId: authorDefault.id

      };
      request(app)
        .post('/api/post/create')
        .set('Content-Type', 'application/json')
        .send(newPost)
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.id).toBe(newPost.id);
          expect(res.body.payload.title).toBe(newPost.title);
          expect(res.body.payload.text).toBe(newPost.text);
          done(error);
        });
    });
  });

  describe('PUT /api/post/:id/update', () => {
    it('Update user', done => {
      const updatePost = {
        title: 'Update Title Post',
        text: 'Update Text Post'
      };
      request(app)
        .put(`/api/post/${postTest.id}/update`)
        .set('Content-Type', 'application/json')
        .send(updatePost)
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          done(error);
        });
    });
  });

  describe('DELETE /api/post/:id/destroy', () => {
    it('Delete user', done => {
      request(app)
        .delete(`/api/post/${postTest.id}/destroy`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          done(error);
        });
    });
  });
});
