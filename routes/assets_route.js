//Requiring modules
const fs = require("fs");
const express = require("express");
const assetsModel = require("../models/assets_model");

//Creating app
const app = express();
app.use(express.json());

//Adding a new asset
app.post("/assets", async function (req, res){
  console.log("Atendiendo la ruta POST /assets", res);

  if(!request.body){
    console.error("No se envio el body en la peticion");
    response.status(500).send("No se envio el body en la peticion");
    return;
  }

  console.log("Creando activo con datos:", request.body);

  const asset = new assetsModel(req.body);

  try {
    console.log("Guardando el activo:", asset)
    // Asset is created here
    await asset.save();
    console.log("Activo creado:", asset);

    res.status(201).send(asset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


//Finding an asset
app.get("/assets", async function (req, res) {
  console.log("Atendiendo a la ruta GET /assets:",req)

  try {
    const assets = await assetsModel.find({});
    res.send(200).send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
