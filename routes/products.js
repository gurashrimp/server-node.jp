var express = require('express');
var router = express.Router();
const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const upload = require('../middle/upload');
const authentication = require('../middle/authentication');
/**
 * http://localhost:3000/san-pham/
 * method: get
 * desc: hiển thị danh sách sản phẩm
 */
router.get('/', async function (req, res, next) {
  // lấy danh sách sản phẩm từ database và hiển thị
  const data = await productController.getProducts();


  res.render('products', { products: data });
});


/**
 * http://localhost:3000/san-pham/
 * method: post
 * desc: thêm mới 1 sản phẩm
 */
 router.post('/',[upload.single('image')], async function (req, res, next) {
  // thêm mới sp vào db
  let {body,file}=req;
  let image=' ';
  if(file){
    image=`http://10.82.148.105:3000/images/${file.filename}`
  }
  body={...body,image};
  await productController.insert(body);
  res.redirect('/san-pham') 
});
router.get('/them-moi', async function (req, res, next) {
  // thêm mới sp vào db
 const categories=await categoryController.getCategories();

  


  res.render('products_insert', {categories:categories});
});

/**
 * http://localhost:3000/san-pham/:id/edit
 * method: get
 * desc: hiển thị chi tiết 1 sản phẩm
 */
router.get('/:id/edit', async function (req, res, next) {
  // thêm mới sp vào db
  let { id } = req.params;
  const product = await productController.getProductById(id);
  const categories = await categoryController.getCategoriesSelected(product.category_id._id);
  
  // lấy 1 sản phẩm từ database và hiển thị
  // const product=await productController.getProductById(id);
  // const categories=await categoryController.getCategories(product.categories_id.id);
  res.render('products_edit', { product: product, categories: categories });
});
/**
 * http://localhost:3000/san-pham/:id/edit
 * method: put
 * desc: hiển thị chi tiết 1 sản phẩm
 */
router.post('/',[upload.single('image')],async function (req, res, next) {
  // update 1 sản phẩm vào db
  let {body,file,params}=req;
  delete body.image;
  if (file) {
    let image = `http://10.82.148.105/images/${file.filename}`
    body = { ...body, image };
  }
 
  await productController.update(params.id,body);
  res.redirect('/san-pham');
});



/**
 * http://localhost:3000/san-pham/:id/delete
 * method: delete
 * desc: xóa 1 sản phẩm
 */
router.delete('/:id/delete', async function (req, res, next) {
  // xóa 1 sản phẩm 
  const {id}=req.params;
  await productController.delete(id);
  


  res.json({result: true});
});


/**
 * http://localhost:3000/san-pham/thong-ke
 * method: get
 * desc: thống kê sp
 */
router.get('/thong-ke', function (req, res, next) {
  // thống kê sản phẩm 



  res.render('products', {});
});

module.exports = router;