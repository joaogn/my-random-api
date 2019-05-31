
import {testDouble, expect} from '../../config/test/helpers';
import avCalculator from './service'
const model = require('../../models');

//unit test, used to test the functions exposed by the module service


describe('avCalculator Unit test controller', ()=> {


    describe('Method Get runwayInUse', ()=>{
        it('Return all Pots',()=>{
            return avCalculator.runwayInUse().then(data => {
                expect(data).to.have.all.keys(['rwyinuse']);
                expect(data.rwyinuse).to.be.equal(10)
            })
        });
    });

});

