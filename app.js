const express = require('express');
const hbs=require('hbs');
const path=require('path');
const bodyParser=require('body-parser');
var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
app.use(bodyParser.urlencoded({ extened:false}));
app.use(bodyParser.json());


const mongoose=require('mongoose');
require('./components/user/model');
require('./components/categories/model');
require('./components/products/model');
mongoose.connect('mongodb+srv://gurashrimp:1410nghi@cluster0.9vxm1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {  
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));
var indexRouter=require('./routes/login');
var productRouder=require('./routes/products');
var apisRouter=require('./routes/api');
app.use('/',indexRouter)
app.use('/san-pham',productRouder)
app.use('/api',apisRouter)
app.listen(3000,()=>{
    console.log("Server starts at host: http://localhost:3000/")
})