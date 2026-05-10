const { Sequelize } = require("sequelize")

const isProd = process.env.NODE_ENV === 'production'

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: Number(process.env.MYSQLPORT),
        dialect: 'mysql',
        logging: false,
        dialectOptions: isProd ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    }
)

module.exports = sequelize