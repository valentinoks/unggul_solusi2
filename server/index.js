const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();
const mysql = require("mysql");

const pelangganRoute = require("./routes/pelanggan");
const barangRoute = require("./routes/barang");
const penjualanRoute = require("./routes/penjualan");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sistem_interface" 
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/pelanggan", pelangganRoute);
app.use("/api/v1/barang", barangRoute);
app.use("/api/v1/penjualan", penjualanRoute);

app.listen(3001, () => {
    console.log("running on port 3001");
});

module.exports = app;