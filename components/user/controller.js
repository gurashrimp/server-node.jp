

const bcrypt = require('bcryptjs');
const userService=require('./service');
exports.login=async(username, password)=>{
    const user=await userService.login(username);
    if(user&&user.password==password){
        return user;
    }
    //kiểm tra mật khẩu sau khi mã hóa
    // const checkPassword= await bcrypt.compare(password,user.password);
    // if(!checkPassword) return null;
    return {id: user._id,username:user.username};
}
exports.register=async(username,password,confirmpassword)=>{
    if(password!=confirmpassword) return null;
    let user=await userService.login(username);
    if(user) return null;

    const hash=await bcrypt.hash(password,await bcrypt.genSalt(10));
    user=await userService.register(username,hash);
    return {id:user._id}
}