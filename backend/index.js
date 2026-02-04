const express = require("express");
const rootRouter = require("./Routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const app = express();

app.use("/api/v1", rootRouter)

