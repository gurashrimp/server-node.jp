var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const userController=require('../components/user/controller');
const productController=require('../components/products/controller');
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
      res.json({status: true,id:user._id,username:user.username,token});
    }else{
      res.json({status: 404})
    }
    // nếu thành công thì chuyển qua sản phẩm
    
    // res.redirect('/san-pham')
  
    // nếu không thành công
    // res.redirect('/dang-nhap');
  });

  router.post('/dang-ky', async function (req, res, next) {
    const { username, password,confirmpassword } = req.body;
    // tiến hành đăng nhập
    const user= await userController.register(username,password,confirmpassword);
    if(user){
      res.json({status: true})
    }else{
      res.json({status: false})
    }
    // nếu thành công thì chuyển qua sản phẩm
    
    // res.redirect('/san-pham')
  
    // nếu không thành công
    // res.redirect('/dang-nhap');
  });
  router.get('/products', async function (req, res, next) {
    // lấy danh sách sản phẩm từ database và hiển thị
    const products = await productController.getProducts();
    res.json(products);
  });
  router.get('/products/:id/detail', async function (req, res, next) {
    let { id } = req.params;
    const product = await productController.getProductById(id);
    res.json(product);
  });

module.exports = router;