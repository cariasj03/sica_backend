//Requiring modules
const express = require('express');
const usersModel = require('../models/users_model');
const sendEmail = require('../bl/send_email');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Sign in an user
app.post('/signin', async function (req, res) {
  try {
    console.log('Attending the POST route: /signin');
    const response = {};

    //Checking if the body was sent
    if (!req.body) {
      response.status = 'Body was not sent in the request.';
      res.status(500).send(response);
      return;
    }

    //Request body variables
    const { email, password } = req.body;

    console.log(`Searching for the user with the email: ${email}`);

    const userByEmail = await usersModel.findOne({ email: email });

    if (!userByEmail) {
      response.status = 'El usuario no se encuentra registrado.';
      res.status(404).send(response);
      return;
    }

    if (!userByEmail.isApproved) {
      response.status =
        'La cuenta de este usuario no ha sido aprobada por una jefatura.';
      res.status(403).send(response);
      return;
    }

    if (userByEmail.password !== password) {
      response.status = 'La contraseña ingresada es incorrecta.';
      res.status(401).send(response);
      return;
    }

    console.log(`User found: ${userByEmail}`);

    res.status(200).send(userByEmail);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Check if the user exists
app.post('/user-exists', async function (req, res) {
  try {
    console.log('Attending the POST route: /user-exists');
    const response = {};

    //Checking if the body was sent
    if (!req.body) {
      response.status = 'Body was not sent in the request.';
      console.log(emptyBody);
      res.status(500).send(response);
      return;
    }

    //Request body variables
    const { email } = req.body;

    console.log(`Searching for the user with the email: ${email}`);

    const userByEmail = await usersModel.findOne({ email: email });

    if (!userByEmail) {
      response.status = false;
      res.status(404).send(response);
      return;
    } else {
      console.log(`User with the email ${email} exists.`);
      response.status = true;
      res.status(200).send(response);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Forgot password
app.post('/forgot-password', async (req, res) => {
  try {
    console.log('Attending the POST route: /forgot-password');

    //Checking if the body was sent
    if (!req.body) {
      response.status = 'Body was not sent in the request.';
      res.status(500).send(response);
      return;
    }

    //Variables
    const response = {};
    const { email } = req.body;
    const randomPassword = Math.random().toString(36).slice(-8);
    const userUpdatedInfo = {
      password: randomPassword,
      changePassword: true,
    };

    //Find the user by email and update the password
    console.log('Searching for the user with the email: ', email);
    const user = await usersModel
      .findOneAndUpdate({ email: email }, userUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Contraseña actualizada:', user);

    //Send the email with the new password
    await sendEmail.sendPasswordEmail({
      email: email,
      password: randomPassword,
      name: user.firstName,
    });

    response.status = true;
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = app;
