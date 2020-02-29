const express = require('express');
const {check} = require('express-validator');
const  fileUpload = require('../middleware/file-upload');
const projetoController=require('../controller/projeto-controller');
const checkAuth=require('../middleware/checkAuth');

const router = express.Router();

//Pra testar rota no Postman retirar Check Auth
router.use(checkAuth);

router.patch('/:pid',
    [
        check('nome').not().isEmpty(),
        check('tecnologia').not().isEmpty(),
        check('link').not().isEmpty(),
    ],
    projetoController.updateProjeto 
);

router.post('/cadastrarprojeto',
    fileUpload.single('image'),
    [
        check('nome').not().isEmpty(),
        check('tecnologia').not().isEmpty(),
        check('link').not().isEmpty(),
    ],
    projetoController.createProjeto
)
router.get('/getprojetos',projetoController.getProjetos);
router.delete('/:pid',projetoController.deleteProjeto)

module.exports=router;