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

const getMessages =async (req,res,next)=>{

    let messages;
    try{
        messages=await Mensagem.find();
    }catch(err){
        const error = new HttpError('Busca por mensagens falhou',500);
        return next(error);
    }

    if(!messages||messages.length===0){
        const error=new HttpError('Não existe nenhuma mensagem',404);
        return next(error);
    }
    res.json({ messages: messages.map(message => message.toObject({ getters: true })) });
}

const deleteMessage = async (req,res,next)=>{
    const messageId=req.params.pid;
    let message;
    try{
        message = await Mensagem.findById(messageId);    
    }catch(err){
        let error= new HttpError('Não foi encontrada uma mensagem com esse id',404)
        return next(error);
    }
    
    try{
        await message.remove();
    }catch(err){
        let error =new HttpError('A mensagem não pode ser deletada',500);
        return next(error);
    }
    res.status(200).json({message:"Mensagem deletada!"})
}

exports.getMessages=getMessages;
exports.createMessage=createMessage;
exports.deleteMessage=deleteMessage;