
const { Sequelize } = require('sequelize');

const connectDB = new Sequelize('tvu_avatar_maker', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connectDB;
