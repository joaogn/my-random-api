'use strict';

//this code is responsible for defining a database table, to be used by sequelize.

export default function(sequelize, DataTypes) {
  
    const Post = sequelize.define('Post',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AuthorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Post.associate = (model) =>{

        Post.belongsTo(model.Author,{foreingKey: 'AuthorId'});
    }

    return Post;

}