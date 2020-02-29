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

exports.createCurso=createCurso;
exports.getCursos=getCursos;