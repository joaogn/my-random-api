
import {testDouble, expect} from '../../config/test/helpers';
import avCalculator from './service'
const model = require('../../models');

//unit test, used to test the functions exposed by the module service


describe('avCalculator Unit test controller', ()=> {


    describe('Method Get runwayInUse', ()=>{
        it('Return all Pots',()=>{
            const variables = {
                rwy1:10,
                rwy2:28,
                wind:120,
                dec:21,
                dir:'W'
            }
            return avCalculator.runwayInUse(variables).then(data => {
                expect(data).to.have.all.keys(['rwyinuse']);
                expect(data.rwyinuse).to.be.equal(10)
            })
        });
    });

});

