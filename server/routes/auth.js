let express = require('express');
let router = express.Router();

let passport = require('passport');

let authController = require('../controllers/auth');

/* POST Route for login */
router.post('/login', authController.login);


/* POST Route for user register */
router.post('/register', authController.register);

/* POST Route for logout */

router.post('/logout', authController.logout);

/* PUT Route for updating user */
router.put('/update', passport.authenticate('jwt', {session: false}), authController.update);

module.exports = router;
