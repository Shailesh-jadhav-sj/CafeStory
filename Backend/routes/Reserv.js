const { Router } = require('express');
const reservController = require('../controllers/reservControllers');
const router = Router();
router.post('/:id',reservController.add);
router.get('/',reservController.getall);
module.exports = router;