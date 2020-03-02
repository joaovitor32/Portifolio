const express=require('express');
const {check} = require('express-validator');
const fileUpload=require('../middleware/file-upload');
const cursoController=require('../controller/curso-controller');
const checkAuth=require('../middleware/checkAuth');

const router=express.Router();

router.get('/getcursos',cursoController.getCursos);

router.use(checkAuth);

router.delete('/:pid',
    check('nome').not().isEmpty(),
    check('descricao').not().isEmpty()
,cursoController.deleteCurso)

router.patch('/:pid',cursoController.updateCurso);

router.post('/createcurso',
    fileUpload.single('imagem'),
    [
        check('nome').not().isEmpty(),
        check('descricao').not().isEmpty(),
    ],
    cursoController.createCurso
)



module.exports=router;