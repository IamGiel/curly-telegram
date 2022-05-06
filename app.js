const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const createError = require("http-errors");
require("dotenv").config();
// require("./redis/redis");

const connection = require("./db/mysql/connection");
const app = express();

app.use(morgan("dev")); // logs route on the console
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 3000;
const rootRoute = require("./routes/root.route");
const authRoute = require("./routes/auth.route");
// app.get("/", (req, res, next)=> {
//   console.log(next)
//   console.log(connection.query())
//   res.send("testing get / route");

// })

app.use(cors());
// configure the app to use bodyParser()

app.use("/", rootRoute);
app.use("/auth", authRoute);
app.use(async (req, res, next) => {
  next(createError.NotFound("not found foo!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log("HELLO WORLD from port ", PORT);
});
