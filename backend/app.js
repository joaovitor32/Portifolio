
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const messageRoutes=require('./routes/message-routes');
const userRoutes=require('./routes/user-routes');

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

app.use('/api/messages',messageRoutes);
app.use('/api/user',userRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
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