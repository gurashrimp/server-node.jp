var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const jwt=require('jsonwebtoken');
const authentication=require('../middle/authentication');
const userController= require('../components/user/controller');
/**
 * http://localhost:3000/dang-nhap
 * method: get
 * desc: hiển thị trang đăng nhập
 */
 router.get('/dang-nhap', function(req, res, next) {
    res.render('login');
  });
  /**
 * http://localhost:3000/dang-nhap
 * method: post
 * desc: tiến hành đăng nhập
 */
router.post('/dang-nhap', async function (req, res, next) {
    const { username, password } = req.body;
    // tiến hành đăng nhập
    const user= await userController.login(username,password);
    if(user){
      const token=jwt.sign({id:user._id,username:user.username},'mykey');
      req.session.token=token;
      res.redirect('/san-pham');
    }else{
      res.redirect('/dang-nhap');
    }
    // nếu thành công thì chuyển qua sản phẩm
    
    // res.redirect('/san-pham')
  
    // nếu không thành công
    // res.redirect('/dang-nhap');
  });
/**
 * http://localhost:3000/dang-xuat
 * method: get
 * desc: tiến hành đăng xuất, thành công chuyển qua đăng nhập
 */
 router.get('/dang-xuat', function (req, res, next) {

    req.session.destroy(function(err){
      res.redirect('/dang-nhap');
    });
    // nếu thành công thì chuyển đăng nhập
    
  });
  module.exports = router;