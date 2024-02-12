require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 8000;
console.log(process.env.PORT)
app.listen(PORT, "localhost", () => {
    console.log(`server is running on port: ${PORT}`)
})