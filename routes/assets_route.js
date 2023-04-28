//Requiring modules
const express = require("express");
const assetsModel = require("../models/assets_model");
const nextId = require("../bl/next_id");
const cors = require("cors");

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new asset
app.post("/assets", async (req, res) => {
  try {
    //Adding id and creationDate to the asset
    const assetJson = req.body;
    const nextAssetId = await nextId.getAssetId();
    assetJson.id = nextAssetId;

    //Creating asset model with new asset info
    const asset = new assetsModel(assetJson);

    console.log("Attending the POST route: /assets");

    console.log(assetJson);
    console.log(asset);
    await asset.save();

    console.log("Activo creado", asset);

    res.status(201).send(asset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all assets
app.get("/assets", async (req, res) => {
  try {
    console.log('Attending the GET route: /assets');
    const assets = await assetsModel.find({});
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching assets by id
app.get('/assets/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /assets/search/by-id/${id}`);
    const assets = await assetsModel
      .find({ $and: [{ id: { $regex: regex } }] })
      .sort({ id: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching assets by name
app.get('/assets/search/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(`(?=.*${name})`, 'i');

    console.log(`Attending the GET route: /assets/search/by-name/${name}`);
    const asse = await assetsModel
      .find({ name: { $regex: regex } })
      .sort({ name:1 })
      .exec();
    res.send(asse);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets by id
app.get("/assets/sort/by-id", async (req, res) => {
  try {
    console.log("Attending the GET route: /assets/sort/by-id");
    const assets = await assetsModel.find().sort({ id: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by name
app.get('/assets/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /assets/sort/by-name');
    const assets = await assetsModel.find().sort({ name: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by unit
app.get('/assets/sort/by-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /assets/sort/by-unit');
    const assets = await assetsModel
      .find({ unit: 1 })
      .exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by status
app.get('/assets/sort/by-status', async (req, res) => {
  try {
    console.log('Attending the GET route: /assets/sort/by-status');
    const assets = await assetsModel.find({ status: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get("/assets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attending the GET route: /assets/${id}`);
    const assetById = await assetsModel.find({ id: id });
    console.log(assetById);

    res.status(200).send(assetById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Updating an unit
app.post('/assets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const assetUpdatedInfo = req.body;

    console.log(`Attending the POST route: /assets/${id}`);

    const result = await assetsModel
      .findOneAndUpdate({ id: id }, assetUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Activo actualizado', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = app;
