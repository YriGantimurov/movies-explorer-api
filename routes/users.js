const router = require('express').Router();
const routeValidator = require('express-route-validator')
const { getUser, userUpdate } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', routeValidator.validate({
    body: {
        email: { isRequired: true, isEmail: true },
        name: { isRequired: true, isLength: { min: 2, max: 20 } }
    }
}), userUpdate)


module.exports = router;