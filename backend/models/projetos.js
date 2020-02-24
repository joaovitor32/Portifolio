const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const projetoSchema= new Schema({
    nome:{type:String,required:true},
    imagem:{type:String,require:true},
    tecnologia:{type:String,required:true},
    link:{type:String,required:true}
})

module.exports=mongoose.model('Projeto',projetoSchema);