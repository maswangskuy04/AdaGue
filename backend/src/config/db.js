const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: Number(process.env.MYSQLPORT),
        dialect: 'mysql',
        logging: false,
    }
)