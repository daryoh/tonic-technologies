const router = require('express').Router();
const {productController} = require('../controllers');


router.post('/add', productController.addProduct);
router.get('/all', productController.allProducts);
router.get('/:id', productController.oneProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;