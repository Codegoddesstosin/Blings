const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema

const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now

	}
});

//make this model accessible to other files
module.exports = Item = mongoose.model('item', ItemSchema);