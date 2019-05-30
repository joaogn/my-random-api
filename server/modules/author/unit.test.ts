
import {testDouble, expect} from '../../config/test/helpers';
import Author from './service'
const model = require('../../models');

//unit test, used to test the functions exposed by the module service


describe('Author Unit test controller', ()=> {

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
        
           
            it('Create new author',()=>{
                const newAuthor = {
                    id: 2,
                    name: 'New Author',
                };
 
                return Author.create(newAuthor)
                      .then(data => {
                            expect(data.dataValues).to.have.all.keys(['id','name','createdAt','updatedAt']);
                        });
                        
            });
    });


    describe('Method Update', ()=>{
        it('Update author',()=>{
            const authorUpdate = {
                name: 'new Author',
            };

            return Author.update(authorDefault.id,authorUpdate).then(data => {
                console.log(data[0]);
                expect(data[0]).to.be.equal(1);
            })

        });
    });


    describe('Method Get Authors', ()=>{
        it('Return all Author',()=>{
            return Author.getAll().then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.all.keys(['id','name','Posts']);
            })
        });
    });

    describe('Method getById', ()=>{
        it('Return id author',()=>{
            return Author.getById(authorDefault.id).then(data => {
                expect(data).to.have.all.keys(['id','name','Posts']);
            })
        });
    });


    describe('Method Delete', ()=>{
        it('Delete author',()=>{

            return Author.delete(authorDefault.id).then(data => {
                expect(data).to.be.equal(1);
            });

        });
    });



});

