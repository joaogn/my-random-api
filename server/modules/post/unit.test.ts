
import {testDouble, expect} from '../../config/test/helpers';
import Post from './service'
import Author from '../author/service'
import post from '../../models/post';
const model = require('../../models');

//unit test, used to test the functions exposed by the module service


describe('Post Unit test controller', ()=> {

    const authorDefault = {
        id: 1,
        name: 'Default Author',
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
                .then(() => {
                    model.Post.create(postDefault)
                        .then(() => {
                            done();
                        })
                })

            })  

        })

    });

    describe('Method Create', ()=>{
        
           
            it('Create new Post',()=>{
                const newPost = {
                    id: 2,
                    title: 'new Title Post',
                    text: 'new Text Post',
                    AuthorId: authorDefault.id
            
                }
 
                return Post.create(newPost)
                      .then(data => {
                            expect(data.dataValues).to.have.all.keys(['id','title','text','AuthorId','createdAt','updatedAt']);
                        });
                        
            });
    });


    describe('Method Update', ()=>{
        it('Update post',()=>{
            const updatePost = {
                title: 'Update Title Post',
                text: 'Update Text Post',
                authorid: authorDefault.id
        
            }

            return Post.update(postDefault.id,updatePost).then(data => {
                console.log(data[0]);
                expect(data[0]).to.be.equal(1);
            })

        });
    });


    describe('Method Get Posts', ()=>{
        it('Return all Pots',()=>{
            return Post.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(['id','title','text','Author']);
            })
        });
    });

    describe('Method getById', ()=>{
        it('Return id post',()=>{
            return Post.getById(postDefault.id).then(data => {
                expect(data).to.have.all.keys(['id','title','text','Author']);
            })
        });
    });

    describe('Method Delete', ()=>{
        it('Delete post',()=>{

            return Post.delete(postDefault.id).then(data => {
                expect(data).to.be.equal(1);
            });

        });
    });



});

