const mongoose = require('mongoose');


const varietiesSchema = mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})


const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        default: ""
    },
    product_varieties: [varietiesSchema],
    date_uploaded: {
        type: Date,
        default: Date.now
    },
    date_edited: {
        type: Date,
        default: Date.now
    },
    show: {
    	type: Boolean,
    	default: true
    }
});

// Export Product model
module.exports = mongoose.model('product', productSchema);
