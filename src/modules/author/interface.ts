
// Specification rules for the module
import { IPost } from '../post/interface';

export interface IAuthor {

    readonly id: number,
    name: string,
    posts?: IPost[]

}

export interface IAuthorDetail extends IAuthor{

    id: number,
    name: string,
    posts?: IPost[]

}

export function createAuthor ({ id, name, posts }: any): IAuthor {
  return { id, name, posts };
}

export function createAuthors (data: any[]): IAuthor[] {
  return data.map(createAuthor);
}

export function createAuthorById ({ id, name, posts }: any): IAuthorDetail {
  return { id, name, posts };
}
