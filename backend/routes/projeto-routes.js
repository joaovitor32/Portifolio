const express = require('express');
const {check} = require('express-validator');
const  fileUpload = require('../middleware/file-upload');
const projetoController=require('../controller/projeto-controller');
const checkAuth=require('../middleware/checkAuth');

const router = express.Router();

router.use(checkAuth);

router.post('/cadastrarprojeto',
    fileUpload.single('image'),
    [
        check('nome').not().isEmpty(),
        check('tecnologias').not().isEmpty(),
    ],
    projetoController.createProjeto
)

module.exports=router;