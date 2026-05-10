const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
}

const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}