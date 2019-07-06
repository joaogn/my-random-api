import { IAuthor } from '../author/interface';

// Specification rules for the module

export interface IPost {

    readonly id: number,
    title: string,
    text: string,
    authorId?: number,
    author?: IAuthor[]

}

export interface IPostDetail extends IPost{

    id: number,
    title: string,
    text: string,
    authorId?: number,
    author?: IAuthor[]

}

export function createPost ({ id, title, text, author }: any): IPost {
  return { id, title, text, author };
}

export function createPosts (data: any[]): IPost[] {
  return data.map(createPost);
}

export function createPostById ({ id, title, text, author }: any): IPostDetail {
  return { id, title, text, author };
}
