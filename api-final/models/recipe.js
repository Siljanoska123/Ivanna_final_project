const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
     
    },
    category: {
        type: String,
        // enum: ['Brеаkfast','Brunch','Lunch','Dinner'],
        required: true,
    },
    time: {
        type: Number,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    visits: {
        type: Number,
        default: 0
    },
    image: {
        type: String
      }
}, { timestamps: true });

module.exports = mongoose.model('recipe', recipeSchema)