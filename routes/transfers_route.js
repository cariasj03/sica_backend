//Requiring modules
const express = require('express');
const transfersModel = require('../models/transfers_model');
const nextId = require('../bl/next_id');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new transfer
app.post('/transfers', async (req, res) => {
  try {
    //Adding id and creationDate to the transfer
    const transferJson = req.body;
    const nextTransferId = await nextId.getTransferId();
    transferJson.transferId = nextTransferId;
    transferJson.creationDate = new Date();
    transferJson.isApproved = false;

    //Creating transfer model with new transfer info
    const transfer = new transfersModel(transferJson);

    console.log('Attending the POST route: /transfers');

    console.log(transferJson);
    console.log(transfer);
    await transfer.save();

    console.log('Activo creado', transfer);

    res.status(201).send(transfer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all transfers
app.get('/transfers', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers');
    const transfers = await transfersModel.find();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching transfers by id
app.get('/transfers/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /transfers/search/by-id/${id}`);
    const transfers = await transfersModel
      .find({ $and: [{ isApproved: true }, { id: { $regex: regex } }] })
      .sort({ id: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
