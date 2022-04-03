const express = require("express");
const routes = require('./routes')

const app = express();

app.use(express.json());

routes(app)

const port = 3000;
app.listen(port, () =>
  console.log(`Server Initilization Sucess at port ${port}`)
);
