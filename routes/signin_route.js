//Requiring modules
const express = require('express');
const usersModel = require('../models/users_model');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Sign in an user
app.post('/signin', async function (req, res) {
  console.log('Attending the POST route: /signin');
  const response = {};

  //Checking if the body was sent
  if (!req.body) {
    response.status = 'Body was no sent in the request.';
    console.log(emptyBody);
    res.status(500).send(response);
    return;
  }

  try {
    //Request body variables
    const { email, password } = req.body;

    console.log(`Searching for the user with the email: ${email}`);
    const userById = await usersModel.findOne({ email: email });
    if (!userById) {
      response.status = 'User not found';
      res.status(404).send(response);
      return;
    }

    if (userById.password !== password) {
      response.status = 'Wrong password';
      res.status(401).send(response);
      return;
    }

    console.log(`User found: ${userById}`);
    res.status(200).send(userById);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = app;
