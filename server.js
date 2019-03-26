//require all dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('config');
const items = require ('./routes/api/items');

const app = express();

//BodyPaser middleware
app.use(express.json());
 
//Databsae config

const db = config.get('mongoURI');

//CONNECT to MongoDb 

mongoose
 .connect(db)
 .then(() => console.log('MongoDb connected'))
 .catch(err=> console.log(err));

 //use routes
 app.use('/api/items', require('./routes/api/items'));
 app.use('/api/users', require('./routes/api/users'));
  app.use('/api/auth', require('./routes/api/auth'));


// Basic Authentication

 app.post('/api/items', verifyToken, (req, res) => {
 	    jwt.verify(req.token, 'secretkey', (err, authData) => {
 	    	if(err){
 	    		res.sendStatus(401);
 	    	} else {
 	    		  res.json({
	    	      message: 'Todo Item created',
	    	      authData
	            });
 	    	}
 	});
	  
});



app.post('/api/login', (req, res) => {
  const user = {
  	id: 1,
  	username: 'tosin',
  	email: 'tosin@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
  	 res.json ({
  	 	token: token
  });

});

});

//Format Token
//Authorization Token


//verify Token
function verifyToken( req, res, next)
{
	//Get Header
	const bearerHeader = req.headers['authorization'];
	//check if bearer is undefined
	if(typeof bearerHeader !== 'undefined') {
         //split at the space

       const bearer = bearerHeader.split('');

       //get token from array
       const bearerToken = bearer[1];
       //set token
       req.token = bearerToken;


       //next middleware
       next();

	}else {
		//forbidden
		res.sendStatus(403);
	}

}



 //serve static assets if in production

 if (process.env.NODE_ENV === 'production')
 {
 	app.use(express.static('client/build'));
 	app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 	});
 }


 const port = process.env.PORT || 5000;
 app.listen(port, () => console.log(`server started on port ${port}`));