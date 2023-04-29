//Requiring modules
const express = require("express");
const transfersModel = require("../models/transfers_model");
const cors = require("cors");

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new transfer
app.post("/transfers", async (req, res) => {
  try {
    //Adding id to the transfer
    const transferJSON = req.body;
    // transferJSON.id = XXX;

    //Creating transfer model with new transfer info
    const transfer = new transfersModel(transferJSON);

    console.log("Attending the POST route: /transfers");

    console.log(transferJSON);
    console.log(transfer);
    await transfer.save();

    console.log("Transferencia creada", transfer);

    res.status(201).send(transfer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get("/transfers", async (req, res) => {
  try {
    const transfers = await transfersModel.find({});
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an unit by id
app.get("/transfers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Attending the GET route: /transfers/${id}`);
    const transfersByAssetById = await transfersModel.find({ id: id });
    console.log(transfersByAssetById);

    res.status(200).send(transfersByAssetById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Updating an unit
app.post('/transfers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const assetUpdatedInfo = req.body;

    console.log(`Attending the POST route: /transfers/${id}`);

    const result = await transfersModel
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
