const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mensagemSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,require:true},
    mensagem:{type:String,require:true}
})

module.exports=mongoose.model('Mensagem',mensagemSchema);