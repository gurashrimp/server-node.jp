const categoryService=require('./service');
exports.getCategories=async()=>{
    const data=await categoryService.getCategories();
    return data;
}
exports.getCategoriesNameById=async(id)=>{
    const name=await categoryService.getCategoriesNameById();
    return name;
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