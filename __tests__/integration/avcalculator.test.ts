import request from 'supertest';
import app from '../../src/api/api';
import HTTPStatus from 'http-status';

describe('AvCalculator Integration Tests', () => {
  describe('GET /api/avcalculator/getrwyinuse', () => {
    it('Return Runway in use', done => {
      request(app)
        .get(`/api/avcalculator/getrwyinuse/10/28/120/21/W`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.rwyinuse).toBe(10);
          done(error);
        });
    });
  });

  describe('GET /api/avcalculator/idealofdescent', () => {
    it('Return ideal of descent', done => {
      request(app)
        .get(`/api/avcalculator/idealofdescent/24000/2000/1500/220`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.idealofdescent).toBe(54);
          done(error);
        });
    });
  });

  describe('GET /api/avcalculator/hpatoinhg/:hpa', () => {
    it('Return hpa to inhg', done => {
      request(app)
        .get(`/api/avcalculator/hpatoinhg/1013`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.inhg).toBe(29.91);
          done(error);
        });
    });
  });

  describe('GET /api/avcalculator/inhgtphpa/:inhg', () => {
    it('Return hpa to inhg', done => {
      request(app)
        .get(`/api/avcalculator/inhgtohpa/29.91`)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toBe(HTTPStatus.OK);
          expect(res.body.payload.hpa).toBe(1013);
          done(error);
        });
    });
  });
});
