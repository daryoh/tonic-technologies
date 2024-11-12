const router = require('express').Router();
const {cartController} = require('../controllers');


router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);
router.post('/checkout', cartController.cartCheckout);
router.post('/view', cartController.viewCart);

module.exports = router;