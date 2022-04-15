const categoryService=require('./service');
exports.getCategories=async()=>{
    const data=await categoryService.getCategories();
    return data;
}
exports.getCategoriesNameById=async(id)=>{
    // const name=await categoryService.getCategoriesNameById();
    // return name;
    try {
        let category = await productService.getProductById(id);
        category = {
            _id: category._id,
            name: category.name,
            description: category.description,
            
        }
        return category;
    } catch (error) {
        return null;
    }
}
exports.getCategoriesSelected=async(id)=>{
    let data=await categoryService.getCategories();
    data=data.map(item=>{
        item={
            _id: item.id,
            name: item.name,
            description: item.description,
            selected: item._id==id
        }
        
        return item;
    })
    return data;
}
exports.insert = async (category) => {
    try {
        await categoryService.insert(category);
    } catch (error) {
        return null;
    }
    
}
exports.delete = async (id) => {
    try {
        await categoryService.delete(id);
    } catch (error) {
        return null;
    }
    
}
exports.update = async (id, category) => {
    try {
        await productService.update(id, category);
    } catch (error) {
        return null;
    }
    
}