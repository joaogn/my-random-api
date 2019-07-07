/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { IUser } from '../../modules/user/interface';

@ObjectType()
export class TypeUser implements IUser {
    @Field(type => ID)
    id?: number;
    @Field()
    name?: string;
    @Field()
    email?: string;
    @Field()
    password?: string;
    @Field()
    createdAt?: string;
    @Field()
    updatedAt?: string;
}

@InputType()
export class InputTypeUser implements IUser {
    @Field({ nullable: true })
    name?: string;
    @Field({ nullable: true })
    email?: string;
    @Field({ nullable: true })
    password?: string;
}
