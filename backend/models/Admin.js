const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true
},
password: {
type: String,
required: true
},
createdAt: {
type: Date,
default: Date.now
}
});

AdminSchema.pre('save', function(next) {
if (!this.isModified('password')) return next();
const salt = bcrypt.genSaltSync(10);
this.password = bcrypt.hashSync(this.password, salt);
next();
});

AdminSchema.methods.comparePassword = async function(password) {
return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', AdminSchema);