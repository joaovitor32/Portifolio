const bycript= require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError= require('../models/httperror');
const User = require('../models/user');

const login = async(req,res,next)=>{

    const {login,password}=req.body;

    let existingUser;
   
    try{
        existingUser= await User.findOne({login:login});
    }catch(err){
        const error = new HttpError('Login falhou, tente de novo',500);
        return next(error);
    }
    if(!existingUser){
        const error = new HttpError("Credenciais inválidas",401);
        return next(error);
    }

    let isValidPassword=false;
    try{
        isValidPassword=await bycript.compare(password,existingUser.password);
    }catch(err){
        const error = new HttpError('Não foi possível te logar',500);
        return next(error);
    }

    if(!isValidPassword){
        const error = new HttpError('Senha incorreta mas o email é válido',401);
        return next(error);
    }

    let token;
    try{
        token=jwt.sign(
            {userId:existingUser._id,email:existingUser.login},
            'super_secret',
            {expiresIn:'1h'}
        )
    }catch(err){
        const error = new HttpError('Login falhou, tente de novo mais tarde',500);
        return next(error);
    }
    res.json({
        userId: existingUser.id,
        login: existingUser.login,
        token: token
    });
}

exports.login=login;