const router = require('express').Router();

const productRoutes = require('./product');

router.use('/product', productRoutes);

module.exports = router;