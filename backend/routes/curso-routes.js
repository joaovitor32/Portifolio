const express=require('express');
const {check} = require('express-validator');
const fileUpload=require('../middleware/file-upload');
const cursoController=require('../controller/curso-controller');
const checkAuth=require('../middleware/checkAuth');

const router=express.Router();

router.use(checkAuth);

router.post('/createcurso',
    fileUpload.single('imagem'),
    [
        check('nome').not().isEmpty(),
        check('descricao').not().isEmpty(),
    ],
    cursoController.createCurso
)

router.get('/getcursos',cursoController.getCursos);

module.exports=router;