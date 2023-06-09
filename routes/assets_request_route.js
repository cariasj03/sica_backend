//Requiring modules
const express = require('express');
const assetsModel = require('../models/assets_model.js');
const cors = require('cors');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Fetching all assets
app.get('/asset-requests', async (req, res) => {
  try {
    console.log('Attending the GET route: /asset-requests');
    const assets = await assetsModel.find({ isApproved: false });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Deleting an asset
app.post('/assets-requests/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    console.log(`Attending the POST route: /asset-requests/delete/${id}`);

    const result = await assetsModel
      .findOneAndDelete(
        { id: id },
        {
          new: true,
        }
      )
      .exec();

    console.log('Activo eliminado', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all assets by id
app.get('/asset-requests/sort/by-id', async (req, res) => {
  try {
    console.log('Attending the GET route: /asset-requests/sort/by-id');
    const assets = await assetsModel
      .find({ isApproved: false })
      .sort({ id: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by name
app.get('/asset-requests/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /asset-requests/sort/by-name');
    const assets = await assetsModel
      .find({ isApproved: false })
      .sort({ name: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an asset by id
app.get('/asset-requests/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /asset-requests/${id}`);
    const assetsById = await assetsModel.find({ id: id });

    res.status(200).send(assetsById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by unit
app.get('/asset-requests/sort/by-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /asset-requests/sort/by-unit');
    const assets = await assetsModel
      .find({ isApproved: false })
      .sort({ unit: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching assets of a specific unit
app.get('/asset-requests/filter/unit/:unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log(`Attending the GET route: /asset-requests/filter/unit/${unit}`);
    const assets = await assetsModel.find({
      $and: [{ isApproved: false }, { unit: unit }],
    });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by status
app.get('/asset-requests/sort/by-status', async (req, res) => {
  try {
    console.log('Attending the GET route: /asset-requests/sort/by-status');
    const assets = await assetsModel
      .find({ isApproved: false })
      .sort({ status: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching assets of a specific status
app.get('/asset-requests/filter/status/:status', async (req, res) => {
  try {
    const status = req.params.status;
    console.log(
      `Attending the GET route: /asset-requests/filter/status/${status}`
    );
    const assets = await assetsModel.find({
      $and: [{ isApproved: false }, { status: status }],
    });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching assets by id
app.get('/asset-requests/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /asset-requests/search/by-id/${id}`);
    const assets = await assetsModel
      .find({ $and: [{ isApproved: false }, { id: { $regex: regex } }] })
      .sort({ id: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching assets by name
app.get('/asset-requests/search/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(`(?=.*${name})`, 'i');

    console.log(
      `Attending the GET route: /asset-requests/search/by-name/${name}`
    );
    const assets = await assetsModel
      .find({
        $and: [
          { isApproved: false },
          {
            $or: [{ name: { $regex: regex } }],
          },
        ],
      })
      .sort({ name: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
