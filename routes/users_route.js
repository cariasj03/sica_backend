//Requiring modules
const express = require('express');
const userModel = require('../models/users_model.js');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new user
app.post('/users/signup', async (req, res) => {
  const user = new userModel(req.body);

  if (!req.body) {
    console.error('No se envío el body en la petición.');
    res.status(500).send('No se envío el body en la petición.');
    return;
  }

  // Generamos la contraseña
  const randomPassword = Math.random().toString(36).slice(-8);

  // Generamos la fecha de creación
  const currentDate = new Date();

  // Agregamos la contraseña al body
  user.password = randomPassword;

  // Agregamos la fecha de creación al body
  user.creationDate = currentDate;

  console.log('Creando usuario con datos:', req.body);

  try {
    console.log('Attending the POST route: /users/signup', req);

    await user.save();

    console.log('Usuario creado', user);

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Updating an user
app.post('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdatedInfo = req.body;

    console.log(`Attending the POST route: /users/${id}`);

    const result = await userModel
      .findOneAndUpdate({ id: id }, userUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Usuario actualizada', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all users
app.get('/users', async (req, res) => {
  try {
    console.log('Attending the GET route: /users');
    const user = await userModel.find({ isApproved: true });
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
    const userById = await userModel.find({ id: id });

    res.status(200).send(userById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by name
app.get('/users/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-name');
    const users = await userModel
      .find({ isApproved: true })
      .sort({ firstName: 1, lastName: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by email
app.get('/users/sort/by-email', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-email');
    const users = await userModel
      .find({ isApproved: true })
      .sort({ email: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by unit
app.get('/users/sort/by-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-unit');
    const users = await userModel
      .find({ isApproved: true })
      .sort({ unit: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
