var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

// http://localhost:3000/
router.get('/', (req, res,next) =>{
  res.render('login',{err:null});
});
//http://localhost:3000/tinh-dien-tich?chieudai=10&chieurong=8
router.get('/tinh-dien-tich', (req, res,next) =>{
  const {chieudai,chieurong}=req.query;
  const dienTich=chieudai*chieurong;
  res.render('Calculator',{result:`Dien tich:${dienTich}`});
});
//http://localhost:3000/tinh-dien-tich?chieudai=10&chieurong=8
router.get('/tinh-dien-tich/:type/', (req, res,next) =>{
  //params
  const {type}=req.params;
  let dienTich=0;
  if(type=='hv'){
    let{canh}=req.query;
    dienTich=canh*canh;
  }
  
  res.render('Calculator',{result:`Dien tich:${dienTich}`});
});
// router.post("/dang-nhap",async function(req,res,next){
//     const{txtEmail, txtPwd}=req.body;
//     console.log(txtEmail);
//     res.render("login",{err:"Username or password invalid"})
// });

module.exports = router;