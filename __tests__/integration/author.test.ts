import request from 'supertest';
import app from '../../src/api/api';
import HTTPStatus from 'http-status';
import { Posts, Authors } from '../../src/models';

describe('Author Integration Tests', () => {
  const authorTest = {
    id: 100,
    name: 'Test Author'
  };

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

  describe('GET /api/author/all', () => {
    it('Return all author on json', done => {
      request(app)
        .get('/api/author/all')
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload[0].name).toBe(authorDefault.name);
          done(error);
        });
    });
  });

  describe('GET /api/author/:id', () => {
    it('Return all author on json', done => {
      request(app)
        .get(`/api/author/${authorDefault.id}`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.id).toBe(authorDefault.id);
          done(error);
        });
    });
  });

  describe('POST /api/author/create ', () => {
    it('Create new author', done => {
      const author = {
        id: 2,
        name: 'Test Author'
      };
      request(app)
        .post('/api/author/create')
        .set('Content-Type', 'application/json')
        .send(author)
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.id).toBe(author.id);
          expect(res.body.payload.name).toBe(author.name);
          done(error);
        });
    });
  });

  describe('PUT /api/author/:id/update', () => {
    it('Update author', done => {
      const author = {
        name: 'AuthorUpdate'
      };
      request(app)
        .put(`/api/author/${authorTest.id}/update`)
        .set('Content-Type', 'application/json')
        .send(author)
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          done(error);
        });
    });
  });

  describe('DELETE /api/author/:id/destroy', () => {
    it('Delete user', done => {
      request(app)
        .delete(`/api/author/${authorTest.id}/destroy`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          done(error);
        });
    });
  });
});
