
//Specification rules for the module
import {IPost} from '../post/interface'

export interface IAuthor {

    readonly id: number,
    name: string,
    Posts?: IPost[]


}

export interface IAuthorDetail extends IAuthor{

    id: number,
    name: string,
    Posts?: IPost[]

} 

export function createAuthor({id,name,Posts}: any): IAuthor{
    return {id,name,Posts}
}

export function createAuthors(data: any[]): IAuthor[] {
    return data.map(createAuthor)
}

export function createAuthorById({id,name,Posts}: any): IAuthorDetail{
    return {id,name,Posts}
}