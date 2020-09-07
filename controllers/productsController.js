const Product = require('../models/product.js');

// List existing products
exports.index = function (req, res) 
{
    Product.find().then(products =>
    {
        return res.json(products)
    })
    .catch(e =>
    {
        console.error("Error occured with fetching products");
        res.json([]);
    })
};

// Add new product
exports.new = function (req, res) 
{
    const product = new Product();
    product.product_name = req.body.product_name || "";
    product.product_description = req.body.product_description || "";
    product.product_varieties = req.body.product_varieties || [];
    product.save(err =>
    {
        if (err)
            return res.json(err);
        res.json({
            message: 'Product added successfully',
            data: 
            {
                ...product,
                id: product._id
            }
        });
    });
};


// Update existing product
exports.update = function (req, res) 
{
    if (!req.body || !req.body.id)
        return res.json(
        {
            errors: "Bad request! Product id missing",
            code: 401
        })
    const product = Product.findOne({_id: id})
    product.product_name = req.body.product_name || product.product_name;
    product.product_varieties = req.body.product_varieties || product.product_varieties;
    product.product_description = req.body.product_description || product.value;
    product.date_edited = Date.now();
    product.save(err =>
    {
        if (err)
            return res.json(err);
        res.json({
            message: 'Product updated successfully',
            data: 
            {
                ...product,
                id: product._id
            }
        });
    })
};
// Delete existing product
exports.delete = function (req, res) 
{
    if (!req.body || !req.body.id)
        return res.json(
        {
            errors: "Bad request! Product id missing",
            code: 401
        })
    
    Product.deleteOne({_id: req.body.id}, err => 
    {
        if (err)
            return res.json(err);
        res.json(
        {
            message: 'Product deleted successfully'
        });
    });
};