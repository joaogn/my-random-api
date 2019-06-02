
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

    describe('Method Get idealOfDescent', ()=>{
        it('Return all Pots',()=>{

            const variables = {
                crzAlt:24000,
                targetAlt:2000,
                descentRate:1500,
                speed:220
            }
            return avCalculator.idealOfDescent(variables).then(data => {
                expect(data).to.have.all.keys(['idealofdescent']);
                expect(data.idealofdescent).to.be.equal(54)
            })
        });
    });

});

