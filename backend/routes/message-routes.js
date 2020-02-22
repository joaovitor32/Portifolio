const express= require('express');
const {check} = require('express-validator');
const checkAuth=require('../middleware/checkAuth');
const messageController= require('../controller/message-controller');
const router= express.Router();

router.post('/newmessage',[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('mensagem').not().isEmpty(),
],messageController.createMessage)

//Pra testar rota no Postman não esqueça de tirar o check auth
router.use(checkAuth);

router.get('/listamensagens',messageController.getMessages)
router.delete('/:pid',messageController.deleteMessage);
module.exports = router;