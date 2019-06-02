
import {testDouble, expect} from '../../config/test/helpers';
import avCalculator from './service'
const model = require('../../models');

//unit test, used to test the functions exposed by the module service


describe('avCalculator Unit test controller', ()=> {


    describe('Method Get runwayInUse', ()=>{
        it('Return runway in use',()=>{
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
        it('Return ideal of descent',()=>{

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

    describe('Method Get inhg', ()=>{
        it('Return hpa to inhg',()=>{

            const variables = {
                hpa:1013
            }
            return avCalculator.hpaToInhg(variables).then(data => {
                expect(data).to.have.all.keys(['inhg']);
                expect(data.inhg).to.be.equal(29.91)
            })
        });
    });

    describe('Method Get hpa', ()=>{
        it('Return inhg to hpa',()=>{

            const variables = {
                inhg:29.91
            }
            return avCalculator.inhgToHpa(variables).then(data => {
                expect(data).to.have.all.keys(['hpa']);
                expect(data.hpa).to.be.equal(1013);
            })
        });
    });

});

