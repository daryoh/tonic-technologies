const router = require('express').Router();

const productRoutes = require('./product');
const cartRoutes = require('./cart');

router.use('/product', productRoutes);
router.use('/cart', cartRoutes);

module.exports = router;