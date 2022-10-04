const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'smart-brain'
	}
});

const app = express();

app.use(cors())
app.use(express.json());

// Root
app.get('/', (req, res) => { res.send('success') })

// Signin
app.post('/signin', signin.handleSignin(db,bcrypt))

// Register
app.post('/register', (req, res) => { register.handleRegister(req,res,db,bcrypt) })

// Profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

// Image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req,res)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user 
/image --> PUT --> user 
*/