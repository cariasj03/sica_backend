//Requiring modules
const express = require("express");
const assetsModel = require("../models/assets_model");
const nextId = require("../bl/next_id");
const cors = require("cors");

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));



//Searching assets by id
app.get('/assets-donations/search/by-id/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const regex = new RegExp(`(?=.*${id})`, 'i');
  
      console.log(`Attending the GET route: /assets-donations/search/by-id/${id}`);
      const assets = await assetsModel
        .find({ $and: [ { unit: 'Donaciones' },{ id: { $regex: regex } }] })
        .sort({ id: 1 })
        .exec();
      res.send(assets);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Searching assets by name
  app.get('/assets-donations/search/by-name/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const regex = new RegExp(`(?=.*${name})`, 'i');
  
      console.log(
        `Attending the GET route: /assets-donations/search/by-name/${name}`
      );
      const assets = await assetsModel
        .find({
          $and: [
            { unit: 'Donaciones' },
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

//Fetching all assets by id
app.get("/assets-donations/sort/by-id", async (req, res) => {
  try {
    console.log("Attending the GET route: /assets-donations/sort/by-id");
    const assets = await assetsModel.find({ unit: 'Donaciones' }).sort({ id: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by name
app.get('/assets-donations/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /assets-donations/sort/by-donaciones');
    const assets = await assetsModel.find({ unit: 'Donaciones' }).sort({ name: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by unit
app.get('/assets-donations/sort/by-unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log('Attending the GET route: /assets-donations/sort/by-unit');
    const assets = await assetsModel.find({ unit: 'Donaciones' }).sort({ unit: unit });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});


//Fetching all assets sorted by status
app.get('/assets-donations/sort/by-status', async (req, res) => {
  try {
    const status = req.params.status;
    console.log('Attending the GET route: /assets-donations/sort/by-status');
    const assets = await assetsModel.find({ unit: 'Donaciones' }).sort({ status: status });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get("/assets-donations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attending the GET route: /assets-donations/${id}`);
    const assetById = await assetsModel.find({ unit: 'Donaciones' },{ id: id });
    console.log(assetById);

    res.status(200).send(assetById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching assets of a specific status
app.get('/assets-donations/filter/status/:status', async (req, res) => {
    try {
      const status = req.params.status;
      console.log(
        `Attending the GET route: /assets-donations/filter/status/${status}`
      );
      const assets = await assetsModel.find({
        $and: [{ unit: 'Donaciones' }, { status: status }],
      });
      res.send(assets);
    } catch (error) {
      res.status(500).send(error);
    }
  });


module.exports = app;
