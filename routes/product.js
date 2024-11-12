const router = require('express').Router();
const {productController} = require('../controllers');


router.post('/', productController.addProduct);
router.get('/', productController.allProducts);
router.get('/:id', productController.oneProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;