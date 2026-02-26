const { Router } = require('express');
const auth = require('../../middlewares/auth');
const authorize = require('../../middlewares/authorize');
const validate = require('../../middlewares/validate');
const controller = require('./schools.controller');

const router = Router();

router.use(auth, authorize('SAAS_ADMIN'));
router.get('/', controller.list);
router.post('/', validate(controller.createSchoolSchema), controller.create);
router.patch('/:id', validate(controller.updateSchoolSchema), controller.update);

module.exports = router;
