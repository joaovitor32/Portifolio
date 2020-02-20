const HttpError= require("../models/httperror");
const jwt =require('jsonwebtoken');

module.exports=(req,res,next)=>{
    
    if(req.method=="OPTIONS"){
        return next();
    }

    try{
        const token=req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error('A autenticação falhou');
        }
        const decodedToken=jwt.verify(token,'super_secret');
        req.userData={userId:decodedToken.userId};
        next();
    }catch(err){
        const error = new HttpError("A autenticação falhou",401);
        return next(error);
    }

}