const Product = require('../models/product.js');

// List existing products
exports.index = function (req, res) 
{
    Product.find().then(products =>
    {
        return res.json(products.map(product => ({ id: product._id, ...product._doc })))
    })
    .catch(e =>
    {
        console.error("Error occured with fetching products");
        res.json([]);
    })
};

// Add new product
exports.new = async (req, res) =>
{
    try
    {
        const product = new Product();
        product.product_name = req.body.product_name || "";
        product.product_description = req.body.product_description || "";
        product.product_varieties = req.body.product_varieties || [];
        await product.save(error =>
        {
            if (error)
                return res.json({ error });
            res.json({
                message: 'Product added successfully',
                data: 
                {
                    id: product._id
                }
            });
        });
    }
    catch(e)
    {
        res.json({
            error: `Error with product creation: ${e}`,
            code: 403
        })
    }
};


// Update existing product
exports.update = async (req, res) =>
{
    try
    {
        if (!req.body || !req.body.id)
            return res.json(
            {
                error: "Bad request! Product id missing",
                code: 401
            })
        const product = await Product.findOne({ _id: req.body.id })
        product.product_name = req.body.product_name || product.product_name;
        product.product_varieties = req.body.product_varieties || product.product_varieties;
        product.product_description = req.body.product_description || product.value;
        product.date_edited = Date.now();
        await product.save(error =>
        {
            if (error)
                return res.json({ error });
            res.json({
                message: 'Product updated successfully'
            });
        })
    }
    catch(e)
    {
        res.json(
        {
            error: `Error occured with product update: ${e}`,
            code: 411
        })
    }
};
// Delete existing product
exports.delete = async (req, res) =>
{
    try
    {
        if (!req.body || !req.body.id)
            return res.json(
            {
                error: "Bad request! Product id missing",
                code: 401
            })
    
        await Product.deleteOne({_id: req.body.id}, error => 
        {
            if (error)
                return res.json({ error });
            res.json(
            {
                message: 'Product deleted successfully'
            });
        });
    }
    catch(e)
    {
        res.json(
        {
            error: `Error occured with product deletion: ${e}`,
            code: 412
        })
    }
};