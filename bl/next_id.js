//Functions
//Function to pad the zeros to the id
const padZeros = (num) => {
  if (typeof num !== 'string') {
    num = num.toString();
  }
  const paddedNum = num.padStart(6, '0');
  return paddedNum;
};

//Function to get the next id
const getNextId = (num) => {
  num++;
  return padZeros(num);
};

//Async functions
//Function to get the unit id
const getUnitId = async () => {
  try {
    const units = await fetch('http://127.0.0.1:8000/units/sort/by-id');
    const unitsList = await units.json();
    const unitIds = unitsList.map((unit) => {
      return Number(unit.id);
    });
    const lastId = Math.max(...unitIds);
    const nextId = await getNextId(lastId);
    return nextId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Function to get the asset id
const getAssetId = async () => {
  try {
    const assets = await fetch('http://127.0.0.1:8000/assets');
    const assetsList = await assets.json();
    const assetsIds = assetsList.map((asset) => {
      return Number(asset.id);
    });
    const lastId = Math.max(...assetsIds);
    const nextId = await getNextId(lastId);
    return nextId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Function to get the transfer id
const getTransferId = async () => {
  try {
    const transfers = await fetch('http://127.0.0.1:8000/transfers');
    const transfersList = await transfers.json();
    const transferIds = transfersList.map((transfer) => {
      return Number(transfer.transferId);
    });
    const lastId = Math.max(...transferIds);
    const nextId = await getNextId(lastId);
    return nextId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getUnitId, getAssetId, getTransferId };
