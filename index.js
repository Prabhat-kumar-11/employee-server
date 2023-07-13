const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");

const { auth } = require("./middleware/authMiddleware");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use(auth);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
