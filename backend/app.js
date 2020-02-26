const fs = require('fs');
const path = require('path')

const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const messageRoutes=require('./routes/message-routes');
const userRoutes=require('./routes/user-routes');
const projetoRoutes=require('./routes/projeto-routes');

const HttpError=require('./models/httperror')

const app=express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
})


/*Entregando arquivos estáticos via Express*/
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/messages',messageRoutes);
app.use('/api/user',userRoutes);
app.use('/api/projeto',projetoRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(
    "mongodb+srv://buzina:mensalao63@cluster0-xgjz4.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
});