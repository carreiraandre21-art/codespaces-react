const { Router } = require('express');
const validate = require('../../middlewares/validate');
const controller = require('./auth.controller');

const router = Router();

router.post('/login', validate(controller.loginSchema), controller.login);
router.post('/refresh', validate(controller.refreshSchema), controller.refresh);
router.post('/logout', validate(controller.refreshSchema), controller.logout);

module.exports = router;
