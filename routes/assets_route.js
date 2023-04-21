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

app.get("/assets", async (req, res) => {
  try {
    const assets = await assetsModel.find({});
    res.send(assets);
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

module.exports = app;
