
// Specification rules for the module

export interface IUser {

    readonly id?: number,
    name?: string,
    email?: string,
    password?: string
    createdAt?: string;
    updatedAt?: string

}

export function createUser ({ id, name, email, password }: any): IUser {
  return { id, name, email, password };
}

export function createUsers (data: any[]): IUser[] {
  return data.map(createUser);
}
