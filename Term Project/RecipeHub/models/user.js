const mongoose=require('mongoose')
const plm= require('passport-local-mongoose')

var dataSchemaObj={
    username:{type:String},
    password:{type:String}
}

var userSchema=new mongoose.Schema(dataSchemaObj);

userSchema.plugin(plm);

module.exports=new mongoose.model('User',userSchema);

