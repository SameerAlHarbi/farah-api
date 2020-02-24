const mongoose = require('mongoose');

const farahSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Farah = new mongoose.model('Farah', farahSchema);

module.exports = Farah;