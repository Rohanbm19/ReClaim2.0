// backend/src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/item.routes"));
app.use("/api/claims", require("./routes/claim.routes"));

module.exports = app;