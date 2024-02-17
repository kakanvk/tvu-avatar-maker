
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const defaultStartDate = new Date();
const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 14); // Tăng ngày hiện tại thêm 14 ngày

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    auth: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    frameURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: defaultStartDate
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: defaultEndDate
    },
    public: {
        type: DataTypes.ENUM('public', 'private', 'only-me'),
        allowNull: false,
        defaultValue: 'private'
    },
    downloaded: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    viewed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Event;
