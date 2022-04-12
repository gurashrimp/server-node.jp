const productService = require('./service');
const date = require('../../utils/date')
exports.getProducts = async () => {
    try {
        let products = await productService.getProducts();
    products = products.map((item, index) => {
        item = {
            _id: item._id,
            name: item.name,
            price: item.price,
            category_id: item.category_id,
            image: item.image,
            description: item.description,
            quantity: item.quantity,
            released: date.format(item.released),
            index: index + 1
        }
        return item;
    })
    return products;
    } catch (error) {
        return null;
    }
    
}

exports.getProductById = async (id) => {
    try {
        let product = await productService.getProductById(id);
        product = {
            _id: product._id,
            name: product.name,
            price: product.price,
            category_id: product.category_id,
            image: product.image,
            description: product.description,
            quantity: product.quantity,
            released: date.format(product.released),
        }
        return product;
    } catch (error) {
        return null;
    }
}
exports.insert = async (product) => {
    try {
        await productService.insert(product);
    } catch (error) {
        return null;
    }
    
}
exports.delete = async (id) => {
    try {
        await productService.delete(id);
    } catch (error) {
        return null;
    }
    
}
exports.update = async (id, product) => {
    try {
        await productService.update(id, product);
    } catch (error) {
        return null;
    }
    
}