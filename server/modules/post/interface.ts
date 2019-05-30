import { IAuthor } from "../author/interface";

//Specification rules for the module

export interface IPost {

    readonly id: number,
    title: string,
    text: string,
    AuthorId?: number,
    Author?: IAuthor[]


}

export interface IPostDetail extends IPost{

    id: number,
    title: string,
    text: string,
    AuthoroId?: number,
    Author?: IAuthor[]

} 

export function createPost({id,title,text,Author}: any): IPost{
    return {id,title,text,Author}
}

export function createPosts(data: any[]): IPost[] {
    return data.map(createPost)
}

export function createPostById({id,title,text,Author}: any): IPostDetail{
    return {id,title,text,Author}
}
