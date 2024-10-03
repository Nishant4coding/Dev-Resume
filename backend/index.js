const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

// app.get('/',(req,res)=>{
  //   res.send('Hi founder and Ceo')
  // })
app.use(cors(
  {
    origin:["https://laughing-space-xylophone-pq5gjrq59pjf76xg-3000.app.github.dev"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
  }
))
app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/resume',require('./routes/resume'))

app.listen(port, () => {
  console.log(`Dev Resume listening at port ${port}`);
});
app.get('/',(req,res)=>{
  res.json("dev resume")
})
