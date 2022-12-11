let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let incidentController = require('../controllers/incident');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route to get incidents */
router.get('/', passport.authenticate('jwt', {session: false}), incidentController.getIncidents);
router.get('/bd', incidentController.getIncidents);

// /* POST Route for creating incident */
// router.post('/add', passport.authenticate('jwt', {session: false}), incidentController.addIncident);
router.post('/create', passport.authenticate('jwt', {session: false}), incidentController.create);
// router.post('/create', incidentController.create);

// /* POST Route for updating  incident */
router.put('/update', passport.authenticate('jwt', {session: false}), incidentController.update);
// router.put('/update', incidentController.update);

module.exports = router;
