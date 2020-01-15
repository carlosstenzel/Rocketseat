const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');

const app = express();

mongoose.connect(
  "mongodb+srv://teste:teste@codehamper-ifwmf.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
