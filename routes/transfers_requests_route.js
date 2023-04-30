//Requiring modules
const express = require("express");
const transfersModel = require("../models/transfers_model");
//const assetsModel = require("../models/assets_model");
const cors = require("cors");

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//fetching all transfers
app.get("/transfers_requests", async (req, res) => {
    try {
      console.log("Attending the GET route: /transfers_requests");
      const transfers_request = await transfersModel.find({ isApproved: false });
      res.send(transfers_request);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Fetching a transfer request by id
app.get("/transfers_requests/:id", async (req, res) => {
    const id = req.params.id;
    try {
      console.log(`Attending the GET route: /transfers_requests/${id}`);
      const transfersByAssetById = await transfersModel.find({ id: id });
      console.log(transfersByAssetById);
  
      res.status(200).send(transfersByAssetById);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Fetching all transfers sorted by name
app.get('/transfers-requests/sort/by-name', async (req, res) => {
    try {
      console.log('Attending the GET route: /transfers-requests/sort/by-name');
      const transfer = await transfersModel
        .find({ isApproved: false })
        .sort({ transferName: 1 })
        .exec();
      res.send(transfer);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  //Fetching all transfer requests sorted by unit origin
app.get('/transfers-requests/sort/by-unitOrigin', async (req, res) => {
    try {
      console.log('Attending the GET route: /transfer-requests/sort/by-unitOrigin');
      const transfers = await transfersModel
        .find({ isApproved: false })
        .sort({ transferUnitOrigin: 1 })
        .exec();
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  //Fetching all transfer requests sorted by unit of destination
app.get('/transfers-requests/sort/by-unitDestination', async (req, res) => {
    try {
      console.log('Attending the GET route: /transfer-requests/sort/by-unitDestination');
      const transfers = await transfersModel
        .find({ isApproved: false })
        .sort({ transferUnitDestination: 1 })
        .exec();
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Fetching transfer request of a specific unit of origin
app.get('/transfers-requests/filter/transferUnitOrigin/:transferUnitOrigin', async (req, res) => {
    try {
      const unit = req.params.unit;
      console.log(`Attending the GET route: /transfers-requests/filter/transferUnitOrigin/${unit}`);
      const transfers = await transfersModel.find({
        $and: [{ isApproved: false }, { transferUnitOrigin: transferUnitOrigin }],
      });
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });


//Fetching transfer request of a specific unit of destination
app.get('/transfers-requests/filter/transferUnitDestination/:transferUnitDestination', async (req, res) => {
    try {
      const unit = req.params.unit;
      console.log(`Attending the GET route: /transfers-requests/filter/transferUnitDestination/${unit}`);
      const transfers = await transfersModel.find({
        $and: [{ isApproved: false }, { transferUnitDestination: transferUnitDestination }],
      });
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });


//Searching transfers by id
app.get('/transfers-requests/search/by-id/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const regex = new RegExp(`(?=.*${id})`, 'i');
  
      console.log(`Attending the GET route: /transfers-requests/search/by-id/${id}`);
      const users = await transfersModel
        .find({ $and: [{ isApproved: false }, { transferId: { $regex: regex } }] })
        .sort({ transferId: 1 })
        .exec();
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
//Searching transfers by name
app.get('/transfers-requests/search/by-name/:name', async (req, res) => {
    try {
        const name = req.params.name;
      const regex = new RegExp(`(?=.*${name})`, 'i');
  
      console.log(`Attending the GET route: /transfers-requests/search/by-name/${name}`);
      const users = await transfersModel
        .find({ $and: [{ isApproved: false }, { transferName: { $regex: regex } }] })
        .sort({ transferName: 1 })
        .exec();
      res.send(transfers);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  module.exports = app;
