'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Active'
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        indexes: [
            { unique: true, fields: ['email'] },
        ]
    });

    return User;
}