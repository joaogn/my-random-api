import * as jwt from 'jwt-simple'; 
import * as HTTPStatus from 'http-status';
import {app, request, expect} from '../../config/test/helpers';

const config = require('../../config/env/config')();
const model = require('../../models');

//integration test, tests the answers to the routes, of this module

describe('Post Integration Tests', ()=> {


    let id;

    const authorDefault = {
        id: 1,
        name: 'Default Author',
    }

    const postTest = {
        id: 100,
        title: 'Title Test Post',
        text: 'Text Test Post',
        AuthorId: authorDefault.id
    }

    const postDefault = {
        id: 1,
        title: 'Title Post',
        text: 'Text Post',
        AuthorId: authorDefault.id

    }


    //before each test is checked the database synchronization, 
    //the whole database is erased, and a known user is created to maintain good practices
    beforeEach((done) => {
        model.sequelize.sync().then(() => {

            model.Author.destroy({
                where: {}
            })
            .then(() => {
                model.Post.destroy({
                    where: {}
                })
                .then(() => {
                    return model.Author.create(authorDefault);
                })
                .then(user => {
                    model.Post.create(postDefault)
                        .then(() => {
                            model.Post.create(postTest)
                            .then(() => {
                                done();
                            })    
                        })
                })

            })  

        })

    });

    describe('GET /api/post/all', ()=>{
        it('Return all posts on json', done =>{
            request(app)
                .get('/api/post/all')
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].title).to.be.equal(postDefault.title);
                    expect(res.body.payload[0].text).to.be.equal(postDefault.text);
                    done(error);
                })
        });
    });

    describe('GET /api/post/:id', ()=>{
        it('Return post on json', done =>{ 
            request(app)
                .get(`/api/post/${postDefault.id}`)
                .set('Content-Type','application/json')
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.equal(postDefault.id);
                    expect(res.body.payload).to.have.all.keys(['id','title','text','Author']);
                    id = res.body.payload.id;
                    done(error);
                })
        });
    });

    describe('POST /api/post/create ', ()=>{
        it('Create new post',done =>{
            const newPost = {
                id: 2,
                title: 'Title New Post',
                text: 'Text New Post',
                AuthorId: authorDefault.id
        
            }
            request(app)
                .post('/api/post/create')
                .set('Content-Type','application/json')
                .send(newPost)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.eql(newPost.id);
                    expect(res.body.payload.title).to.eql(newPost.title);
                    expect(res.body.payload.text).to.eql(newPost.text);
                    done(error);
            })

        });
    });

    describe('PUT /api/post/:id/update', ()=>{
        it('Update user', done =>{
            const updatePost = { 
                title: 'Update Title Post',
                text: 'Update Text Post',
            }
            request(app)
                .put(`/api/post/${postTest.id}/update`)
                .set('Content-Type','application/json')
                .send(updatePost)
                .end((error,res) =>  {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
            })

        });
    });

    describe('DELETE /api/post/:id/destroy', ()=>{
        it('Delete user', done =>{
            request(app)
            .delete(`/api/post/${postTest.id}/destroy`)
            .set('Content-Type','application/json')
            .end((error,res) =>  {
                expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            })

        });
    });

});