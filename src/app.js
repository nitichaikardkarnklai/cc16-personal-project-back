require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/not-found");
const handleError = require("./middlewares/handle-error");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const surveyRoute = require("./routes/survey-route")
const userSurveyRoute = require("./routes/user-survey-route")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/surveys", surveyRoute);
app.use("/user-surveys", userSurveyRoute);

app.use("*", notFound);
app.use(handleError);

let PORT = process.env.PORT || 8000;
app.listen(PORT, "localhost", () => {
    console.log(`server is running on port: ${PORT}`);
})