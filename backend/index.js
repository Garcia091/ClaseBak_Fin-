const express = require ('express');
const app = express();
const cors = require('cors')
const path = require ('path');


app.use(express.json());
app.use(cors());
const routes = require ('./src/routes/routes.js')
app.use('/api',routes);
app.use(express.urlencoded({extended: false}));

app.listen(5000,()=>{
  console.log('server started')
});