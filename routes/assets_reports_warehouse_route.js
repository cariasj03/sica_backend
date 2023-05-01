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
app.get('/assets-warehouse/search/by-id/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const regex = new RegExp(`(?=.*${id})`, 'i');
  
      console.log(`Attending the GET route: /assets-warehouse/search/by-id/${id}`);
      const assets = await assetsModel
        .find({ $and: [ { unit: 'Bodega' },{ id: { $regex: regex } }] })
        .sort({ id: 1 })
        .exec();
      res.send(assets);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Searching assets by name
  app.get('/assets-warehouse/search/by-name/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const regex = new RegExp(`(?=.*${name})`, 'i');
  
      console.log(
        `Attending the GET route: /assets-warehouse/search/by-name/${name}`
      );
      const assets = await assetsModel
        .find({
          $and: [
            { unit: 'Bodega' },
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
app.get("/assets-warehouse/sort/by-id", async (req, res) => {
  try {
    console.log("Attending the GET route: /assets-warehouse/sort/by-id");
    const assets = await assetsModel.find({ unit: 'Bodega' }).sort({ id: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by name
app.get('/assets-warehouse/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /assets-warehouse/sort/by-bodega');
    const assets = await assetsModel.find({ unit: 'Bodega' }).sort({ name: 1 }).exec();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all assets sorted by unit
app.get('/assets-warehouse/sort/by-unit', async (req, res) => {
  try {
    const unit = req.params.unit;
    console.log('Attending the GET route: /assets-warehouse/sort/by-unit');
    const assets = await assetsModel.find({ unit: 'Bodega' }).sort({ unit: unit });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});


//Fetching all assets sorted by status
app.get('/assets-warehouse/sort/by-status', async (req, res) => {
  try {
    const status = req.params.status;
    console.log('Attending the GET route: /assets-warehouse/sort/by-status');
    const assets = await assetsModel.find({ unit: 'Bodega' }).sort({ status: status });
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get("/assets-warehouse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attending the GET route: /assets-warehouse/${id}`);
    const assetById = await assetsModel.find({ unit: 'Bodega' },{ id: id });
    console.log(assetById);

    res.status(200).send(assetById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching assets of a specific status
app.get('/assets-warehouse/filter/status/:status', async (req, res) => {
    try {
      const status = req.params.status;
      console.log(
        `Attending the GET route: /assets-warehouse/filter/status/${status}`
      );
      const assets = await assetsModel.find({
        $and: [{ unit: 'Bodega' }, { status: status }],
      });
      res.send(assets);
    } catch (error) {
      res.status(500).send(error);
    }
  });


module.exports = app;
