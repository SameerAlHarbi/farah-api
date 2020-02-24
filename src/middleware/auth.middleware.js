const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        //get token from header and remove bearer keyword.
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, 'thisismynewskill');

        //find user with provided id and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});

        if(!user) {
            throw new Error();
        }

        req.user = user;

        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate perfect!'});
    }
};

module.exports = auth;
