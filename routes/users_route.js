//Requiring modules
const express = require('express');
const userModel = require('../models/users_model.js');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new user
app.post('/users', async (req, res) => {
  const user = new userModel(req.body);

  try {
    console.log('Attending the POST route: /users', req);

    await user.save();

    console.log('Unidad creada', user);

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all users
app.get('/users', async (req, res) => {
  try {
    console.log('Attending the GET route: /users');
    const user = await userModel.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an user by id
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /users/${id}`);
    const usertById = await userModel.find({ id: id });
    console.log(userById);

    res.status(200).send(usertById);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
