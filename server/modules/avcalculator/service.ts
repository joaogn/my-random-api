import {Iavcalculator,rwyInUse} from './interface';
import Bluebird from 'bluebird';
const model = require('../../models');


//The service class serves to implement our CRUDS or our Business Rules

class avCalculator implements Iavcalculator{
    public rwyinuse?: number;

    constructor(){}

    runwayInUse({rwy1,rwy2,wind,dec,dir}:any): Bluebird<Iavcalculator>{
        
        return new Bluebird<Iavcalculator>((resolve, reject) => {
            if ((dir != 'W') && (dir != 'E')){
                reject();
            }
            if ((rwy1 <0) || ((rwy1*10) > 360)){
                reject();
            }
            if ((rwy2 <0) || ((rwy2*10) > 360)){
                reject();
            }
            if ((wind <0) || (wind > 360)){
                reject();
            }
            if ((dec <0) || (dec > 360)){
                reject();
            }
            let crossangle:number;
            if (dir == 'W'){
                if ((rwy1*10) > (wind+dec)){
                    crossangle =(rwy1*10) - (wind+dec);
                }else{
                    crossangle = (wind+dec) - (rwy1*10);
                } 
            }else{
                if (dir == 'E'){
                    if (rwy1 > (wind-dec)){
                        crossangle =(rwy1*10) - (wind-dec);
                    }else{
                        crossangle =(wind-dec) - (rwy1*10);
                    } 
                }
            }

            if(crossangle < 90){
                resolve(rwyInUse({rwyinuse:rwy1}));
            }else{
                resolve(rwyInUse({rwyinuse:rwy2}));
            }

        });

    }


}

export default new avCalculator();
