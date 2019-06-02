import {Iavcalculator,rwyInUse,descentIdeal,hpa2inhg,inhg2hpa} from './interface';
import Bluebird from 'bluebird';
const model = require('../../models');


//The service class serves to implement our CRUDS or our Business Rules

class avCalculator implements Iavcalculator{
    public rwyinuse?: number;

    constructor(){}

    runwayInUse({rwy1,rwy2,wind,dec,dir}:any): Bluebird<Iavcalculator>{
        
        return new Bluebird<Iavcalculator>((resolve, reject) => {
            if ((dir != 'W') && (dir != 'E')){
                reject('Error Direction Wrong, this W and E');
            }
            if ((rwy1 <0) || ((rwy1*10) > 360)){
                reject('Error rwy1 Wrong, this 0 to 36');
            }
            if ((rwy2 <0) || ((rwy2*10) > 360)){
                reject('Error rwy2 Wrong, this 0 to 36');
            }
            if ((wind <0) || (wind > 360)){
                reject('Error wind Wrong, this 0 to 360');
            }
            if ((dec <0) || (dec > 360)){
                reject('Error dec Wrong, this 0 to 360');
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

            if(crossangle <=90){
                resolve(rwyInUse({rwyinuse:rwy1}));
            }else{
                resolve(rwyInUse({rwyinuse:rwy2}));
            }

        });

    }


    idealOfDescent({crzAlt,targetAlt,descentRate,speed}:any): Bluebird<Iavcalculator>{
        
        return new Bluebird<Iavcalculator>((resolve, reject) => {

            if(targetAlt > crzAlt){
                reject('target alt > crz alt');
            }
            if( (crzAlt<0) || (targetAlt<0) || (descentRate<0) || (speed<0)  ){
                reject('value negative');
            }

            const result:number =  ( ( (crzAlt-targetAlt) / descentRate )/60 )*speed;

            resolve(descentIdeal({idealofdescent:Math.ceil(result)}))     

        });

    }

    hpaToInhg({hpa}: any): Bluebird<Iavcalculator>{

        return new Bluebird<Iavcalculator>((resolve, reject) => {
            const result: number =  parseFloat( (hpa * 0.02953).toFixed(2));
            resolve( hpa2inhg({inhg:result}) );
        });

    }

   inhgToHpa({inhg}: any): Bluebird<Iavcalculator>{

    return new Bluebird<Iavcalculator>((resolve, reject) => {
        const result: number =  Math.round(inhg * 33.86389);
        resolve( inhg2hpa({hpa:result}) );
    });

    }


}

export default new avCalculator();
