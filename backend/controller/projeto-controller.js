const HttpError = require('../models/httperror');
const {validationResult}=require('express-validator');
const uuid=require('uuid/v4');
const Projeto=require('../models/projetos');
const mongoose=require('mongoose');

const createProjeto = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError('Algum dado do formulário está incorreto',422))
    }
    const {nome,tecnologia,link}=req.body;

    
    const createdProjeto=new Projeto({
        nome,
        tecnologia,
        link,
        imagem:req.file.path
    })
    if(!createdProjeto){
        const error=new HttpError('Projeto não foi criado, tente de novo!',500);
        return next(error);
    }
    try {
        await createdProjeto.save();
      } catch (err) {
        const error = new HttpError(
          'Criação de projeto falhou, tente mais tarde.',
          500
        );
        return next(error);
      }
    res.status(201).json({projeto:createProjeto});
}

exports.createProjeto=createProjeto;