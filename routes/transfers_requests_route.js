//Requiring modules
const express = require('express');
const transfersModel = require('../models/transfers_model');
const assetsModel = require('../models/assets_model');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Fetching a transfer request by id
app.get('/transfers_requests/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /transfers_requests/${id}`);
    const transfersByAssetById = await transfersModel.find({ id: id });
    console.log(transfersByAssetById);

    res.status(200).send(transfersByAssetById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers sorted by transfer id
app.get('/transfers-requests/sort/by-transfer-id', async (req, res) => {
  try {
    console.log(
      'Attending the GET route: /transfers-requests/sort/by-transfer-id'
    );
    const transfers = await transfersModel
      .find({ isApproved: false })
      .sort({ transferId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers sorted by asset id
app.get('/transfers-requests/sort/by-asset-id', async (req, res) => {
  try {
    console.log(
      'Attending the GET route: /transfers-requests/sort/by-asset-id'
    );
    const transfers = await transfersModel
      .find({ isApproved: false })
      .sort({ assetId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers sorted by origin unit
app.get('/transfers-requests/sort/by-origin-unit', async (req, res) => {
  try {
    console.log(
      'Attending the GET route: /transfers-requests/sort/by-origin-unit'
    );
    const transfer = await transfersModel
      .find({ isApproved: false })
      .sort({ originUnit: 1 })
      .exec();
    res.send(transfer);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers sorted by target unit
app.get('/transfers-requests/sort/by-target-unit', async (req, res) => {
  try {
    console.log(
      'Attending the GET route: /transfers-requests/sort/by-target-unit'
    );
    const transfer = await transfersModel
      .find({ isApproved: false })
      .sort({ targetUnit: 1 })
      .exec();
    res.send(transfer);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching transfers filtered by origin unit
app.get('/transfers-requests/filter/by-origin-unit/:unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log(
      `Attending the GET route: /transfers-requests/filter/by-origin-unit/${unit}`
    );
    const transfers = await transfersModel.find({
      $and: [{ isApproved: false }, { originUnit: unit }],
    });
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching transfers filtered by target unit
app.get('/transfers-requests/filter/by-target-unit/:unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log(
      `Attending the GET route: /transfers-requests/filter/by-target-unit/${unit}`
    );
    const transfers = await transfersModel.find({
      $and: [{ isApproved: false }, { targetUnit: unit }],
    });
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching transfer requests by transfer id
app.get('/transfers-requests/search/by-transfer-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(
      `Attending the GET route: /transfers/search/by-transfer-id/${id}`
    );
    const transfers = await transfersModel
      .find({
        $and: [{ isApproved: false }, { transferId: { $regex: regex } }],
      })
      .sort({ transferId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching transfer requests by asset id
app.get('/transfers-requests/search/by-asset-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /transfers/search/by-asset-id/${id}`);
    const transfers = await transfersModel
      .find({
        $and: [{ isApproved: false }, { assetId: { $regex: regex } }],
      })
      .sort({ assetId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an transfer by id
app.get('/transfers-requests/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /transfers-requests/${id}`);
    const transferById = await transfersModel.find({ transferId: id });

    res.status(200).send(transferById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Deleting a transfer
app.post('/transfers-requests/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    console.log(`Attending the POST route: /transfer-requests/delete/${id}`);

    const result = await transfersModel
      .findOneAndDelete(
        { transferId: id },
        {
          new: true,
        }
      )
      .exec();

    console.log('Solicitud de traslado eliminada: ', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = app;
