const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

// app.get('/',(req,res)=>{
//   res.send('Hi founder and Ceo')
// })
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://createyourresume.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", cors());

app.use(express.json());
//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resume", require("./routes/resume"));

app.listen(port, () => {
  console.log(`Dev Resume listening at port ${port}`);
});
app.get("/", (req, res) => {
  res.json("dev resume");
});
