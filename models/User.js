const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true,
		unique: true
	},

	register_date: {
		type: Date,
		default: Date.now
		

	}
});

//make this model accessible to other files
module.exports = User = mongoose.model('User', UserSchema);