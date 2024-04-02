const mongoose=require('mongoose')
const plm= require('passport-local-mongoose')

var dataSchemaObj={
    username:{type:String},
    password:{type:String},
    //field to hadle oauth authenticated users
    oauthId: {type: String}, //id velue user third party
    oauthProvider: {type: String},// what provider used
    created: {type: Date}, // when user was created 
}

var userSchema=new mongoose.Schema(dataSchemaObj);

userSchema.plugin(plm);

module.exports=new mongoose.model('User',userSchema);

