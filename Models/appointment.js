const {Schema}=require('mongoose')
const {model}=require('mongoose');
const demo = new Schema({
    TokenID:{type:String,required: true},
    PName:{type:String,required: true},
    DRName:{type:String,required: true},
    Date:{type:String,required: true},
    Time:{type:String,required: true}
});

const details = model('appointment',demo)
module.exports=details;