const express = require("express");
const mongoose = require("mongoose");
const bodyparsers = require("body-parser");
const routeManager = require("./routes");
const cors = require("cors");
const app = express();
const path = require("path");
var swaggerJSDoc = require('swagger-jsdoc');

require("dotenv").config({ path: "variables.env" });
// const YAML=require('yamljs')


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// var options = {
//   explorer: true
// };

// routeManager.use('/', swaggerUi.serve);
// routeManager.get('/', swaggerUi.setup(swaggerDocument,options));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
var swaggerDefinition = {
  info: {
    title: "Speakpulse API",
    version: "1.0.0",
    description: "Speakpulse REST API doc"
  },
  host: "localhost:9001",
  basePath: "/api"
};

var options = { swaggerDefinition: swaggerDefinition, apis: ["./controller/*.js"] };
var swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("connected", () =>
  console.log("mongodb connected successfully.")
);
mongoose.connection.on("error", error => console.log("connection failed."));
mongoose.set('useFindAndModify', false);

app.use(
  bodyparsers.urlencoded({
    extended: true
  })
);


app.use(cors());
app.use(bodyparsers.json({}));
router.get('/', (req, res) => {
  res.json({
    message: "API wrorking"
  })
})
// app.use("/api", routeManager);

module.exports = app.listen(process.env.PORT, () =>
  console.log("server started")
);


