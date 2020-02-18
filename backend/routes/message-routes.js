const express= require('express');
const {check} = require('express-validator');

const messageController= require('../controller/message-controller');
const router= express.Router();

router.post('/newmessage',[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('mensagem').not().isEmpty(),
],messageController.createMessage)

module.exports = router;