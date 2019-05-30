import * as jwt from 'jwt-simple'; 
import * as HTTPStatus from 'http-status';
import {app, request, expect} from '../../config/test/helpers';

const config = require('../../config/env/config')();
const model = require('../../models');

//integration test, tests the answers to the routes, of this module

describe('Author Integration Tests', ()=> {


    let id;

    const authorTest = {
        id: 100,
        name: 'Test Author',
    };

    const authorDefault = {
        id: 1,
        name: 'Default Author',

    }

    //before each test is checked the database synchronization, 
    //the whole database is erased, and a known user is created to maintain good practices
    beforeEach((done) => {
        model.sequelize.sync().then(() => {

            model.Author.destroy({
                where: {}
            })
            .then(() => {
                return model.Author.create(authorDefault);
            })
            .then(user => {
                model.Author.create(authorTest)
                    .then(() => {
                        done();
                    })
            })
        })

    });

    describe('GET /api/author/all', ()=>{
        it('Return all author on json', done =>{
            request(app)
                .get('/api/author/all')
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(authorDefault.name);
                    done(error);
                })
        });
    });

    describe('GET /api/author/:id', ()=>{
        it('Return all author on json', done =>{ 
            request(app)
                .get(`/api/author/${authorDefault.id}`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(authorDefault.id);
                    expect(res.body.payload).to.have.all.keys(['id','name','Posts']);
                    id = res.body.payload.id;
                    done(error);
                })
        });
    });

    describe('POST /api/author/create ', ()=>{
        it('Create new author',done =>{
            const author = {
                id: 2,    
                name: 'Test Author',
            }
            request(app)
                .post('/api/author/create')
                .set('Content-Type','application/json')
                .send(author)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(author.id);
                    expect(res.body.payload.name).to.eql(author.name);
                    done(error);
            })

        });
    });

    describe('PUT /api/author/:id/update', ()=>{
        it('Update author', done =>{
            const author = { 
                name: 'AuthorUpdate',
            }
            request(app)
                .put(`/api/author/${authorTest.id}/update`)
                .set('Content-Type','application/json')
                .send(author)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
            })

        });
    });

    describe('DELETE /api/author/:id/destroy', ()=>{
        it('Delete user', done =>{
            request(app)
            .delete(`/api/author/${authorTest.id}/destroy`)
            .set('Content-Type','application/json')
            .end((error,res) =>  {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })

        });
    });

});