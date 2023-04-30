//Requiring modules
const express = require('express');
const usersModel = require('../models/users_model.js');
const sendEmail = require('../bl/send_email');

const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new user
app.post('/users/signup', async (req, res) => {
  const user = new usersModel(req.body);

  // Verificamos que se haya enviado el body
  if (!req.body) {
    console.error('No se envío el body en la petición.');
    res.status(500).send('No se envío el body en la petición.');
    return;
  }

  //Almacenamos los datos del body en variables
  const { id, email } = req.body;

  // Creamos el objeto de respuesta
  const response = {};

  // Verificamos que no exista un usuario con la misma identificación o correo electrónico
  const userExists = await usersModel.findOne({
    $or: [{ id: id }, { email: email }],
  });

  if (userExists) {
    response.status =
      'Ya existe un usuario registrado con esa identificación o correo electrónico.';
    res.status(400).send(response);
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
  // Agregamos el estado de aprobación al body
  user.isApproved = false;
  // Agregamos el estado de cambio de contraseña al body
  user.changePassword = true;

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

    const result = await usersModel
      .findOneAndUpdate({ id: id }, userUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Usuario actualizado', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Checking users password
app.post('/users/check-pass/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = {};

    console.log(`Attending the POST route: /users/check-pass/${id}`);

    const userById = await usersModel.findOne({ id: id });
    if (userById.password !== req.body.currentPassword) {
      response.status = false;
      res.status(200).send(response);
      return;
    } else {
      response.status = true;
      res.status(200).send(response);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Updating users password
app.post('/users/update-pass/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = {};

    console.log(`Attending the POST route: /users/update-pass/${id}`);

    const userById = await usersModel.findOne({ id: id });
    if (userById.password !== req.body.currentPassword) {
      response.status = false;
      res.status(200).send(response);
      return;
    }

    const { newPassword } = req.body;

    const userUpdatedInfo = {
      password: newPassword,
      changePassword: false,
    };

    const result = await usersModel
      .findOneAndUpdate({ id: id }, userUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Contraseña actualizada', result);

    //Send the email with the new password
    await sendEmail.passChangeSuccessEmail({
      email: userById.email,
      name: userById.firstName,
    });

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
    const user = await usersModel.find({ isApproved: true });
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
    const userById = await usersModel.find({ id: id });

    res.status(200).send(userById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by name
app.get('/users/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-name');
    const users = await usersModel
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
    const users = await usersModel
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
    const users = await usersModel
      .find({ isApproved: true })
      .sort({ unit: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by role
app.get('/users/sort/by-role', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-role');
    const users = await usersModel
      .find({ isApproved: true })
      .sort({ role: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by id
app.get('/users/sort/by-id', async (req, res) => {
  try {
    console.log('Attending the GET route: /users/sort/by-id');
    const users = await usersModel
      .find({ isApproved: true })
      .sort({ id: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching users of a specific unit
app.get('/users/filter/unit/:unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log(`Attending the GET route: /users/filter/unit/${unit}`);
    const users = await usersModel.find({
      $and: [{ isApproved: true }, { unit: unit }],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching users of a specific role
app.get('/users/filter/role/:role', async (req, res) => {
  try {
    const role = req.params.role;
    console.log(`Attending the GET route: /users/filter/role/${role}`);
    const roles = await usersModel.find({
      $and: [{ isApproved: true }, { role: role }],
    });
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching users by id
app.get('/users/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /users/search/by-id/${id}`);
    const users = await usersModel
      .find({ $and: [{ isApproved: true }, { id: { $regex: regex } }] })
      .sort({ id: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching users by name
app.get('/users/search/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(`(?=.*${name})`, 'i');

    console.log(`Attending the GET route: /users/search/by-name/${name}`);
    const users = await usersModel
      .find({
        $and: [
          { isApproved: true },
          {
            $or: [
              { firstName: { $regex: regex } },
              { lastName: { $regex: regex } },
            ],
          },
        ],
      })
      .sort({ firstName: 1, lastName: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching users by email
app.get('/users/search/by-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const regex = new RegExp(`(?=.*${email})`, 'i');

    console.log(`Attending the GET route: /users/search/by-email/${email}`);
    const users = await usersModel
      .find({ $and: [{ isApproved: true }, { email: { $regex: regex } }] })
      .sort({ email: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
