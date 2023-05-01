//Requiring modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Connecting to database
mongoose
  .connect(
    "mongodb+srv://cariasj:QAkOkuLUarqYsDvL@sicaapp.uezet7u.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "sicaApp" }
  )
  .then(() => console.log("Database connected!"));

//Creating app
const app = express();
app.use(express.json());
app.use(cors({}));

//App listening
app.listen(8000, () => {
  console.log("Listening to requests on port 8000!");
});

//Main route
app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

//Units route
const unitsRouter = require("./routes/units_route");
app.use(unitsRouter);

//Assets route
const assetsRouter = require("./routes/assets_route");
app.use(assetsRouter);

//Users route
const usersRouter = require("./routes/users_route");
app.use(usersRouter);

//Signin route
const signinRouter = require("./routes/signin_route");
app.use(signinRouter);

//User requests route
const userRequestsRouter = require('./routes/user_requests_route');
app.use(userRequestsRouter);

//asset requests route
const assetRequestsRouter = require('./routes/assets_request_route');
app.use(assetRequestsRouter);

//transfer requests route
const transferRequestsRouter = require('./routes/transfers_requests_route');
app.use(transferRequestsRouter);

//asset requests route
const assetWarehouseRouter = require('./routes/assets_reports_warehouse_route');
app.use(assetWarehouseRouter);

//asset requests route
const assetDonationsRouter = require('./routes/assets_reports_donations_route');
app.use(assetDonationsRouter);

//asset requests route
const assetReportRouter = require('./routes/assets_reports_route');
app.use(assetReportRouter);