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

    console.log('Attending the POST route: /units');

    await unit.save();

    console.log('Unidad creada', unit);

    res.status(201).send(unit);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Updating a unit
app.post('/units/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const unitUpdatedInfo = req.body;

    console.log(`Attending the POST route: /units/${id}`);

    const result = await unitsModel
      .findOneAndUpdate({ id: id }, unitUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Unidad actualizada', result);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all units by id
app.get('/units/sort/by-id', async (req, res) => {
  try {
    console.log('Attending the GET route: /units/sort/by-id');
    const units = await unitsModel.find().sort({ id: 1 }).exec();
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all units sorted by name
app.get('/units/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /units/sort/by-name');
    const units = await unitsModel.find().sort({ name: 1 }).exec();
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all units sorted by creation date
app.get('/units/sort/by-creationDate', async (req, res) => {
  try {
    console.log('Attending the GET route: /units/sort/by-creationDate');
    const units = await unitsModel.find().sort({ creationDate: 1 }).exec();
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all units sorted by province
app.get('/units/sort/by-province', async (req, res) => {
  try {
    console.log('Attending the GET route: /units/sort/by-province');
    const units = await unitsModel.find().sort({ province: 1 }).exec();
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all units sorted by canton
app.get('/units/sort/by-canton', async (req, res) => {
  try {
    console.log('Attending the GET route: /units/sort/by-canton');
    const units = await unitsModel.find().sort({ canton: 1 }).exec();
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching units in a specific province
app.get('/units/filter/province/:province', async (req, res) => {
  try {
    const province = req.params.province;
    console.log(`Attending the GET route: /units/filter/province/${province}`);
    const units = await unitsModel.find({ province: province });
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching units in a specific canton
app.get('/units/filter/province/:province/canton/:canton', async (req, res) => {
  try {
    const province = req.params.province;
    const canton = req.params.canton;
    console.log(
      `Attending the GET route: /units/filter/province/${province}/canton/${canton}`
    );
    const units = await unitsModel.find({ province: province, canton: canton });
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching units by id
app.get('/units/search/by-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const regex = new RegExp(`(?=.*${id})`, 'i');

    console.log(`Attending the GET route: /units/search/${id}`);
    const units = await unitsModel.find({ id: { $regex: regex } });
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Searching units by name
app.get('/units/search/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const regex = new RegExp(`^(?=.*${name})`, 'i');

    console.log(`Attending the GET route: /units/search/${name}`);
    const units = await unitsModel.find({ name: { $regex: regex } });
    res.send(units);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get('/units/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attending the GET route: /units/${id}`);
    const unitById = await unitsModel.find({ id: id });
    console.log(unitById);

    res.status(200).send(unitById);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
