import * as jwt from 'jwt-simple'; 
import * as HTTPStatus from 'http-status';
import {app, request, expect} from '../../config/test/helpers';

const config = require('../../config/env/config')();
const model = require('../../models');

//integration test, tests the answers to the routes, of this module

describe('AvCalculator Integration Tests', ()=> {


    describe('GET /api/avcalculator/getrwyinuse', ()=>{
        it('Return Runway in use', done =>{ 
            request(app)
                .get(`/api/avcalculator/getrwyinuse/10/28/120/21/W`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.have.all.keys(['rwyinuse']);
                    expect(res.body.payload.rwyinuse).to.equal(10);
                    done(error);
                })
        });
    });

    describe('GET /api/avcalculator/idealofdescent', ()=>{
        it('Return ideal of descent', done =>{ 
            request(app)
                .get(`/api/avcalculator/idealofdescent/24000/2000/1500/220`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.have.all.keys(['idealofdescent']);
                    expect(res.body.payload.idealofdescent).to.be.equal(54);
                    done(error);
                })
        });
    });

    describe('GET /api/avcalculator/hpatoinhg/:hpa', ()=>{
        it('Return hpa to inhg', done =>{ 
            request(app)
                .get(`/api/avcalculator/hpatoinhg/1013`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.have.all.keys(['inhg']);
                    expect(res.body.payload.inhg).to.be.equal(29.91)
                    done(error);
                })
        });
    });

    describe('GET /api/avcalculator/inhgtphpa/:inhg', ()=>{
        it('Return hpa to inhg', done =>{ 
            request(app)
                .get(`/api/avcalculator/inhgtohpa/29.91`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.have.all.keys(['hpa']);
                    expect(res.body.payload.hpa).to.be.equal(1013);
                    done(error);
                })
        });
    });


});