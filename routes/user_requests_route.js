//Requiring modules
const express = require('express');
const usersModel = require('../models/users_model.js');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Fetching an user by id
app.get('/user-requests/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /user-requests/${id}`);
    const userById = await usersModel.find({ id: id });

    res.status(200).send(userById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Deleting an user
app.post('/user-requests/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    console.log(`Attending the POST route: /user-requests/delete/${id}`);

    const result = await usersModel
      .findOneAndDelete(
        { id: id },
        {
          new: true,
        }
      )
      .exec();

    console.log('Usuario eliminado', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all users sorted by name
app.get('/user-requests/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /user-requests/sort/by-name');
    const users = await usersModel
      .find({ isApproved: false })
      .sort({ firstName: 1, lastName: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by email
app.get('/user-requests/sort/by-email', async (req, res) => {
  try {
    console.log('Attending the GET route: /user-requests/sort/by-email');
    const users = await usersModel
      .find({ isApproved: false })
      .sort({ email: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all users sorted by unit
app.get('/user-requests/sort/by-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /user-requests/sort/by-unit');
    const users = await usersModel
      .find({ isApproved: false })
      .sort({ unit: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching users of a specific unit
app.get('/user-requests/filter/unit/:unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log(`Attending the GET route: /user-requests/filter/unit/${unit}`);
    const users = await usersModel.find({
      $and: [{ isApproved: false }, { unit: unit }],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching users by id
app.get('/user-requests/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /user-requests/search/by-id/${id}`);
    const users = await usersModel
      .find({ $and: [{ isApproved: false }, { id: { $regex: regex } }] })
      .sort({ id: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching users by name
app.get('/user-requests/search/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(`(?=.*${name})`, 'i');

    console.log(
      `Attending the GET route: /user-requests/search/by-name/${name}`
    );
    const users = await usersModel
      .find({
        $and: [
          { isApproved: false },
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
app.get('/user-requests/search/by-email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const regex = new RegExp(`(?=.*${email})`, 'i');

    console.log(
      `Attending the GET route: /user-requests/search/by-email/${email}`
    );
    const users = await usersModel
      .find({ $and: [{ isApproved: false }, { email: { $regex: regex } }] })
      .sort({ email: 1 })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
