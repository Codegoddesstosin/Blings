const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../../middleware/auth');

//User model
const User = require('../../models/User');

//@ route get api/auth
//@desc Auth User
//@access public
router.post('/', (req, res) => {
	const {email, password } = req.body;

	//simple validation
	if(!email || !password ) {
		return res.status(400). json ({ msg: 'please enter all fields'});
	}

	User.findOne({email})
	.then(user => {
		if (!user)  return res.status(400).json({ msg: 'User Does not exist'});

		//validate passowrd
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(!isMatch) return res.status(400).json({
				msg: 'Invalid Credentials'


			});


		 		 	jwt.sign (
                          
                         {id: user.id},
                          
                         config.get('jwtSecret'),
                         { expiresIn: 3600 },
                         (err, token) => {
                         	if(err) throw err;

                         
                        res.json({
                        	token,
		 		 	 	user: {
		 		 	 		id: user.id,
		 		 	 		name: user.name,
		 		 	 		email: user.email

		 		 	 	}
		 		 	 });   


                         } 

		 		 	)

		});

	
		 
	})
	
});
 
router.get('/user', auth, (req, res) => {
	User.findById(req, user.id)
	.select('-password')
	.then(user => res.json (user));

});




module.exports =  router;