//Requiring modules
const fs = require("fs");
const express = require("express");
const unitsModel = require("../models/units_model");

//Creating app
const app = express();
app.use(express.json());

//Adding a new unit
app.post("/units", async function (req, res) {

  console.log("Atendiendo la ruta POST /units", res);

  if(!request.body){
    console.error("No se envio el body en la peticion");
    response.status(500).send("No se envio el body en la peticion");
    return;
  }

  console.log("Creando unidad con datos:", request.body)
  const unit = new unitsModel(req.body);

  try {

    console.log("Guardando el usuario:",unit);
    // Unit is created here
    await unit.save();
    console.log("Unidad creada:", unit);

    res.send(unit);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get("/units", async function(req, res) {
  console.log("Atendiendo a la ruta GET /units:",req)
  try {
    const units = await unitsModel.find({});
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
