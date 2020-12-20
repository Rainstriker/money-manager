const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/Transaction');
const passport = require('passport');

const authentication = passport.authenticate('jwt', { session: false });

router.get('/', authentication, transactionControllers.getAllTransaction);
router.post('/add/', authentication, transactionControllers.addTransaction);
router.put('/update/:id', authentication, transactionControllers.updateTransaction);
router.delete('/remove/:id', authentication, transactionControllers.removeTransaction);


module.exports = router;