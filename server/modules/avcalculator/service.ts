import {Iavcalculator,rwyInUse} from './interface';
import Bluebird from 'bluebird';
const model = require('../../models');


//The service class serves to implement our CRUDS or our Business Rules

class avCalculator implements Iavcalculator{
    public rwyinuse?: number;

    constructor(){}

    runwayInUse(): Bluebird<Iavcalculator>{

        return new Bluebird<Iavcalculator>((resolve, reject) => {
            resolve(rwyInUse({rwyinuse:10}));
        });

    }


}

export default new avCalculator();
