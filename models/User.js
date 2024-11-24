const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
})
module.exports = mongoose.model('User', userShema);
userShema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//compare password
userShema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
module.exports = mongoose.model('User', userShema);