//Requiring modules
const fs = require("fs");
const express = require("express");
const unitsModel = require("../models/units_model");

//Creating app
const app = express();
app.use(express.json());

//Adding a new unit
app.post("/units", async (req, res) => {
  const unit = new unitsModel(req.body);

  try {
    console.log("Atendiendo la ruta POST /units");

    await unit.save();
    console.log("Unidad creada:", unit);

    res.status(201).send(unit);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/units", async (req, res) => {
  try {
    const units = await unitsModel.find({});
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
