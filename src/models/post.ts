'use strict';

// this code is responsible for defining a database table, to be used by sequelize.
import { Table, Model, DataType, Column, Scopes, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Authors } from './index';

@Scopes({})
@Table({
  timestamps: true,
  tableName: 'Posts'
})
export class Posts extends Model<Posts> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    })
      id: number;

      @Column({
        type: DataType.STRING,
        allowNull: false
      })
      title: string;

      @Column({
        type: DataType.STRING,
        allowNull: false
      })
      text: string;

      @ForeignKey(() => Authors)
      @Column
      authorId: number;

      @BelongsTo(() => Authors, 'authorId')
      author: Authors;
}
