const express = require ('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require ('path');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(express.json());
app.use(cors());
app.use(morgan());
const routes = require ('./src/routes/routes.js')
app.use('/api',routes);
app.use(express.urlencoded({extended: false}));

app.listen(5000,()=>{
  console.log('server started')
});