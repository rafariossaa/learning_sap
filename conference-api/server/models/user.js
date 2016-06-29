// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// define the schmea for our user model
var userSchema = new Schema ({
	local : { 
	   email: String,
	   password : String,
	}
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//validating if password isv alid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//vreate the model for users and export to app
module.exports = mongoose.model('User', userSchema);
