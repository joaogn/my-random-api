//Specification rules for the module

export interface Iavcalculator {

    readonly rwyinuse?: number,
    readonly idealofdescent?: number


}


export function rwyInUse({rwyinuse}: any):  Iavcalculator{
    return {rwyinuse}
}

export function descentIdeal({idealofdescent}: any):  Iavcalculator{
    return {idealofdescent}
}
