const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const cursoSchema = new Schema({
    nome:{type:String,required:true},
    imagem:{type:String,required:true},
    descricao:{type:String,required:true}
})

module.exports=mongoose.model('Curso',cursoSchema);