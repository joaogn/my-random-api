'use strict';

//this code is responsible for defining a database table, to be used by sequelize.

export default function(sequelize, DataTypes) {
  
    const Author = sequelize.define('Author',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Author.associate = (model) =>{

        Author.hasMany(model.Post, {foreingKey: 'AuthorId'});
    }

    return Author;

}