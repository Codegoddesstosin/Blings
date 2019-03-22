const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//item model
const Item = require('../../models/Item');

//@ route get api/items
//@desc get all todo items
//@access private
router.get('/', (req, res) => {
	Item.find()
	 .sort({ date: -1})
	.then(items => res.json(items))
});
 
//@ route post api/items
//@desc create todoitem
//@access private
router.post('/', (req, res) => {
	const newItem = new Item ({
		name: req.body.name 
	});

	newItem.save().then(item => res.json(item));
});

//@ route post api/items
//@desc update todo item
//@access private
router.put('/:id', (req, res) => {
	Item.findOneAndUpdate(req.params.id, {
        name: req.body.name

	}, {new: true})
	.then(item => {
		if(!item) {
			return res.status(404).send({
				message: "Todo-item not found with id" + req.params.id
			});
		}
		res.send(item);
	});
});


//@ route delete api/items
//@desc delete an todo-item
//@access private
router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
	.then(item => item.remove()
	.then(() => res.json({success: true})))
	.catch(err => res.status(404).json({ success: false }));
});






module.exports =  router;