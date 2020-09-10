const router = require('express').Router();
const productsController = require('./controllers/productsController.js');

// App routes
router.route('/').get(productsController.index)
	.post(productsController.new)
    .patch(productsController.update)
    .put(productsController.update)
    .delete(productsController.delete);

router.route('/:id').get(productsController.find)
// Export API routes
module.exports = router;