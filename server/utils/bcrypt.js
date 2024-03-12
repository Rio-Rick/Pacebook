const bcrytp = require("bcryptjs")

const hashPassword = (password) => {
    return bcrytp.hashSync(password, 10)
}

const comparePassword = (password, hashPass) => {
    return bcrytp.compareSync(password, hashPass)
} 

module.exports = {hashPassword, comparePassword}