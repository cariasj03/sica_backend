//Requiring modules
const express = require('express');
const unitsModel = require('../models/units_model');
const cors = require('cors');
const nextId = require('../bl/next_id');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new unit
app.post('/units', async (req, res) => {
  try {
    //Adding id and creationDate to the unit
    const unitJson = req.body;
    const nextUnitId = await nextId.getUnitId();
    unitJson.id = nextUnitId;
    unitJson.creationDate = new Date();

    //Creating unit model with new unit info
    const unit = new unitsModel(unitJson);

    console.log('Atendiendo la ruta POST /units');

    await unit.save();

    console.log('Unidad creada', unit);

    res.status(201).send(unit);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all units
app.get('/units', async (req, res) => {
  try {
    console.log('Atendiendo la ruta GET /units');
    const units = await unitsModel.find({});
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get('/units/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Atendiendo la ruta GET /units/${id}`);
    const unitById = await unitsModel.find({ id: id });
    console.log(unitById);

    res.status(200).send(unitById);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
