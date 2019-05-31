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
                .get(`/api/avcalculator/getrwyinuse`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.have.all.keys(['rwyinuse']);
                    expect(res.body.payload.rwyinuse).to.equal(10);
                    done(error);
                })
        });
    });


});