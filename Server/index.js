const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const Port = 5000;

app.listen(Port, () => {
  console.log(`Welcome to the Backend! The server is now live and listening at port ${Port}`);
});
