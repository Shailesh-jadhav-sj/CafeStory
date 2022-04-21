const { Router } = require('express');
var bodyParser = require('body-parser');
const itemController = require('../controllers/itemControllers');
const router = Router();
const multer =  require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./public/images')
  },
  filename: function(req,file,cb){
    console.log(req.body);
    console.log(file);
    cb(null,Date.now() + path.extname(file.originalname)+".jpg")
  },
});

const maxSize = 1 * 1000 * 1000;
const upload = multer({storage: storage,
    limits: { fileSize: maxSize },
    

}); 

router.use(bodyParser.json(),bodyParser.urlencoded({ extended: true }));
router.get('/items', itemController.get_items);
router.post('/items',upload.single("image"),itemController.post_item);
router.put('/items/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);

module.exports = router;