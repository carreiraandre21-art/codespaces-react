const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { loginSchema, registerSchema, forgotPasswordSchema } = require('../schemas/authSchemas');

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);

module.exports = router;
