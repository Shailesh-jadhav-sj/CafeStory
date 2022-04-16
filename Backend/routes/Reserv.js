const { Router } = require('express');
const reservController = require('../controllers/reservControllers');
const router = Router();
router.post('/reserv/',reservController.add);
module.exports = router;