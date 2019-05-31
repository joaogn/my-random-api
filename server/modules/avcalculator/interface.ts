//Specification rules for the module

export interface Iavcalculator {

    readonly rwyinuse?: number,


}


export function rwyInUse({rwyinuse}: any):  Iavcalculator{
    return {rwyinuse}
}
