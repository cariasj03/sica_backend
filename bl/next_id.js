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
exports.getUnitId = async () => {
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
