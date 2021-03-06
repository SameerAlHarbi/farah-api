const express = require('express');
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware');
const router = new express.Router();

router.get('/users/me', auth,async (req, res) => {

    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send(e);
    // }

    res.send(req.user);
});

router.get('/users/:id', auth,async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send( {user, token});
    } catch(e) {
        res.status(400).send();
    }
});

router.post('/users/login', async (req, res) => {

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

router.patch('/users/:id', auth,async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['userName','email', 'password'];
    const isValidOperation = updates.every(update => 
        allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send('Invallid update!');
    }

    try{
        const user = await User.findById(req.params.id);

        updates.forEach(update => 
            user[update] = req.body[update]);
        
        await user.save();

        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {

    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
           return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});



module.exports = router;