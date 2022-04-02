const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ola mundo");
});

const port = 3000;
app.listen(port, () =>
  console.log(`Server Initilization Sucess at port ${port}`)
);
