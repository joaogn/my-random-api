//Specification rules for the module

export interface Iavcalculator {

    readonly rwyinuse?: number,
    readonly idealofdescent?: number,
    readonly hpa?: number,
    readonly inhg?: number
}


export function rwyInUse({rwyinuse}: any):  Iavcalculator{
    return {rwyinuse}
}

export function descentIdeal({idealofdescent}: any):  Iavcalculator{
    return {idealofdescent}
}

export function hpa2inhg({inhg}: any):  Iavcalculator{
    return {inhg}
}

export function inhg2hpa({hpa}: any):  Iavcalculator{
    return {hpa}
}
