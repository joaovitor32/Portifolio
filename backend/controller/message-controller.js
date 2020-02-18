const {validationResult} = require('express-validator');

const HttpError = require('../models/httperror');
const Mensagem = require('../models/mensagem');

const mongoose=require('mongoose');

const createMessage= async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Algum dado do formulário está incorreto',422))
    }
    const {name,email,mensagem}=req.body;
    const createdMessage= new Mensagem({
        name,
        email,
        mensagem,
    })    
    try{
        await createdMessage.save();
    }catch(err){
        const error= new HttpError('Mensagem não cadastrada tente de novo',500);
        return next(error);
    }
    res.status(201).json({place:createdMessage});

} 

exports.createMessage=createMessage;