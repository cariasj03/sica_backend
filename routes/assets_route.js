//Requiring modules
const fs = require("fs");
const express = require("express");
const assetsModel = require("../models/assets_model");
const nextId = require("../bl/next_id");
const { request } = require("http");

//Creating app
const app = express();
app.use(express.json());

//Adding a new asset
app.post("/assets", async (req, res) => {
  try {
    console.log("Attending the POST route: /assets");
    const asset = new assetsModel(req.body);

    await asset.save();
    console.log("Activo creado:", asset);

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

module.exports = app;
