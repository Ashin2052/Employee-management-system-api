const express = require("express");
const mongoose = require("mongoose");
const bodyparsers = require("body-parser");
const routeManager = require("./routes");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config({ path: "variables.env" });
var server = require('http').Server(app);
const YAML=require('yamljs')
 
    
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var options = {
  explorer: true
};

routeManager.use('/', swaggerUi.serve);
routeManager.get('/', swaggerUi.setup(swaggerDocument,options));


mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("connected", () =>
  console.log("mongodb connected successfully.")
);
mongoose.connection.on("error", error => console.log("connection failed."));

app.use(
  bodyparsers.urlencoded({
    extended: true
  })
);

// swagger definition

// var swaggerDefinition = {
//   info: {
//     title: "Speakpulse API",
//     version: "1.0.0",
//     description: "Speakpulse REST API doc"
//   },
//   host: "localhost:4000",
//   basePath: "/api"
// };

// var options = {
//   swaggerDefinition: swaggerDefinition,
//   apis: ["./**/controllers/*.js"]
// };
// var swaggerSpec = swaggerjSDoc(options);
// app.get("/swagger.json", function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });
// app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyparsers.json({}));
app.use("/api", routeManager);

module.exports = app.listen(process.env.PORT, () =>
  console.log("server started")
);


