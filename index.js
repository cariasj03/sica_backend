//Requiring modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Connecting to database
mongoose
  .connect(
    'mongodb+srv://cariasj:QAkOkuLUarqYsDvL@sicaapp.uezet7u.mongodb.net/?retryWrites=true&w=majority',
    { dbName: 'sicaApp' }
  )
  .then(() => console.log('Database connected!'));

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//App listening
app.listen(8000, () => {
  console.log('Listening to requests on port 8000!');
});

//Main route
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

//Units route
const unitsRouter = require('./routes/units_route');
app.use(unitsRouter);

const assetsRouter = require("./routes/assets_route");
app.use(assetsRouter);

const usersRouter = require("./routes/users_route");
app.use(usersRouter)
