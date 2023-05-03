//Requiring modules
const express = require('express');
const cors = require('cors');
const transfersModel = require('../models/transfers_model');
const assetsModel = require('../models/assets_model');
const usersModel = require('../models/users_model');
const nextId = require('../bl/next_id');
const sendEmail = require('../bl/send_email');

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//Adding a new transfer
app.post('/transfers', async (req, res) => {
  try {
    console.log('Attending the POST route: /transfers');

    //Adding id and creationDate to the transfer
    const transferInfo = req.body.transferInfo;
    const nextTransferId = await nextId.getTransferId();
    transferInfo.transferId = nextTransferId;
    transferInfo.creationDate = new Date();

    const queryId = req.query.id;

    if (queryId !== undefined) {
      const user = await usersModel.find({ id: queryId });
      if (user[0].role === 'Encargado de Inventario por Unidad') {
        transferInfo.isApproved = false;
      } else {
        const assetUpdatedInfo = req.body.assetUpdatedInfo;
        const asset = await assetsModel
          .findOneAndUpdate({ id: transferInfo.assetId }, assetUpdatedInfo, {
            new: true,
          })
          .exec();
        console.log('Activo actualizado', asset);

        transferInfo.isApproved = true;
        transferInfo.approvedBy = queryId;
      }
    } else {
    }

    const transfer = new transfersModel(transferInfo);
    await transfer.save();

    console.log('Traslado creado', transfer);

    res.status(201).send(transfer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Updating a transfer
app.post('/transfers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const assetUpdatedInfo = req.body.assetUpdatedInfo;
    const transferUpdatedInfo = req.body.transferUpdatedInfo;

    console.log(`Attending the POST route: /transfers/${id}`);

    const transfer = await transfersModel
      .findOneAndUpdate({ transferId: id }, transferUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Traslado actualizado', transfer);

    const asset = await assetsModel
      .findOneAndUpdate({ id: transfer.assetId }, assetUpdatedInfo, {
        new: true,
      })
      .exec();

    console.log('Activo actualizado', asset);

    const requestingUser = await usersModel.findOne({
      id: transfer.requestedBy,
    });

    //Send the email with the status of the transfer
    await sendEmail.sendTransferResultEmail({
      email: requestingUser.email,
      name: `${requestingUser.firstName} ${requestingUser.lastName}`,
      transferStatus: transfer.isApproved === true ? 'Aprobada.' : 'Rechazada.',
      transferId: transfer.transferId,
    });

    res.status(201).send(transfer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Fetching all transfers
app.get('/transfers', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers');
    const transfers = await transfersModel.find();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching an transfer by id
app.get('/transfers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Attending the GET route: /transfers/${id}`);
    const transferById = await transfersModel.find({ transferId: id });

    res.status(200).send(transferById);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by AssetID
app.get('/transfers/sort/by-id', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-id');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ assetId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by targetUnit
app.get('/transfers/sort/by-target-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-target-unit');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ targetUnit: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by originUnit
app.get('/transfers/sort/by-origin-unit', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-origin-unit');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ originUnit: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by transferReason
app.get('/transfers/sort/by-transfer-reason', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-transfer-reason');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ transferReason: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by transferReason
app.get('/transfers/sort/by-name', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-name');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ assetName: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by assetId
app.get('/transfers/sort/by-assetId', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-assetId');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ assetId: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching all transfers by id
app.get('/transfers/sort/by-creation-date', async (req, res) => {
  try {
    console.log('Attending the GET route: /transfers/sort/by-creation-date');
    const transfers = await transfersModel
      .find({ isApproved: true })
      .sort({ creationDate: 1 })
      .exec();
    res.send(transfers);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching transfers of a specific Origin unit
app.get('/transfers/filter/originUnit/:originUnit', async (req, res) => {
  try {
    const originUnit = req.params.originUnit;
    console.log(
      `Attending the GET route: /transfers/filter/originUnit/${originUnit}`
    );
    const orUn = await transfersModel.find({
      $and: [{ isApproved: true }, { originUnit: originUnit }],
    });
    res.send(orUn);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetching transfers of a specific Target unit
app.get('/transfers/filter/targetUnit/:targetUnit', async (req, res) => {
  try {
    const targetUnit = req.params.targetUnit;
    console.log(
      `Attending the GET route: /transfers/filter/targetUnit/${targetUnit}`
    );
    const tarUn = await transfersModel.find({
      $and: [{ isApproved: true }, { targetUnit: targetUnit }],
    });
    res.send(tarUn);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
