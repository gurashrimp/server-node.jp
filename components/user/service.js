
const userModel=require('./model');
exports.login = async (username)=>{
    //  const user=data.filter(item=>item.username==username[0]);
    const user=await userModel.findOne({username:username});
    return user;
}
exports.register=async(username, password)=>{
    const user=new userModel({username,password});
    await user.save();
}
var data=[
    {id:1, username:'admin@gmail.com',password:'1', name:'Tuấn'},
    {id:2, username:'slave1@gmail.com',password:'2', name:'Tuấn'},
    {id:3, username:'slave2@gmail.com',password:'3', name:'Tuấn'},
    {id:4, username:'slave3@gmail.com',password:'4', name:'Tuấn'},
]