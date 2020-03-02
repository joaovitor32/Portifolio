const HttpError = require('../models/httperror');
const {validationResult} = require('express-validator');
const Curso =require('../models/cursos');
const fs=require('fs');

const createCurso = async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Algum dado do formulário está incorreto',422));
    }

    const {nome,descricao}=req.body;

    const createdCurso = new Curso({
        nome,
        descricao,
        imagem:req.file.path,
    })

    if(!createdCurso){
        const error = new HttpError('Curso não foi criado, tente de novo',500);
        return next(error);
    }

    try{
        await createdCurso.save();
    }catch(err){
        const error = new HttpError('Criação de curso falhou, tente mais tarde',500);
        return next(error);
    }
    res.status(201).json({projeto:createdCurso});
}

const getCursos = async (req,res,next)=>{
    
    let cursos;
    
    try{
        cursos=await Curso.find();
    }catch(err){
        const error = new HttpError('Busca por projeto falhou!',500);
        return next(error);
    }

    res.status(200).json({cursos:cursos.map(curso=>curso.toObject({getters:true}))});

}

const updateCurso=async (req,res,next)=>{
    const errors=validationResult(req);
    
    if(!errors.isEmpty()){
        return next(new HttpError('Algum dado do formulário está errado',422));
    }

    const {nome,descricao}=req.body;
    let cursoId=req.params.pid;
    let curso;

    try{
        curso=await Curso.findById(cursoId);
    }catch(err){
        const error = new HttpError("Não foi encontrado curso com esse ID",500)
        return next(error);
   }

   curso.nome=nome;
   curso.descricao=descricao;

   try{
       await curso.save();
   }catch(err){
       const error = new HttpError('Não foi possível efetuar a atualização',500);
       return next(error);
   }
   res.status(200).json({curso:curso.toObject({getters:true})})
}

const deleteCurso = async(req,res,next) =>{
    
    const cursoId=req.params.pid;

    let curso;

    try{
        curso=await Curso.findById(cursoId);
    }catch(err){
        let error = new HttpError('Não foi encontrado curso com esse ID',500);
        return next(error);
    }

    try{
        await curso.remove();
    }catch(err){
        let error= new HttpError('Não foi possível remover o curso',500);
        return  next(error);
    }

    const imagePath=curso.imagem;   
    fs.unlink(imagePath,err=>{
        console.log(err);
    })
    res.status(200).json({message:'Curso deletado!'});

} 

exports.updateCurso=updateCurso;
exports.deleteCurso=deleteCurso;
exports.createCurso=createCurso;
exports.getCursos=getCursos;