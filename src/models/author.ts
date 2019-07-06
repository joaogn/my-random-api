'use strict';

// this code is responsible for defining a database table, to be used by sequelize.
import { Table, Model, DataType, Column, Scopes, HasMany } from 'sequelize-typescript';
import { Posts } from './index';
@Scopes({})
@Table({
  timestamps: true,
  tableName: 'Authors'
})
export class Authors extends Model<Authors> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    })
      id: number;

      @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      })
      name: string;

      @HasMany(() => Posts, 'authorId')
      posts: Posts[];
}

//  Author.associate = (model) =>{

//     Author.hasMany(model.Post, {foreingKey: 'AuthorId'});
// }
