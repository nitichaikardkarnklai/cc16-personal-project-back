require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/not-found");
const handleError = require("./middlewares/handle-error");
const authRoute = require("./routes/authRoute")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use("*", notFound);
app.use(handleError);

let PORT = process.env.PORT || 8000;
app.listen(PORT, "localhost", () => {
    console.log(`server is running on port: ${PORT}`)
})