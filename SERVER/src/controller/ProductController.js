// const {Product} = require('../models/product/products');

// const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');

// const getProductByID = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('id', id);
//         const selectedProduct = await Product.findByPk(id);

//         if (!selectedProduct) {
//             const message = 'Product not found';
//             console.log(errorColor, 'Product not found', resetColor);
//             return res.status(401).json({ message });
//         }

//         const message = 'Product found: ';
//         res.status(200).json({ message, selectedProduct });

//     } catch (error) {
//         console.error(errorColor, 'Error getting products:', error, resetColor);
//         res.status(500).json({ message: 'Error getting products' });
//     }
// };

// const createProduct = async (req, res) => {
//     try {
//         const { name, description, price } = req.body;
//         const newProduct =  Product.create({ name, description, price });
//         console.log(successColor, "Product created successfully", resetColor);
//         res.status(200).json({ message: "Product created successfully", data: newProduct });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Error adding a product"});
//     }
// };

// module.exports = {
//     getProductByID,
//     createProduct
// }
const { Product } = require('../models/product/products');
const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching product with id: ${id}`);
        const selectedProduct = await Product.findByPk(id);

        if (!selectedProduct) {
            console.log(errorColor, 'Product not found', resetColor);
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product found', data: selectedProduct });
    } catch (error) {
        console.error(errorColor, 'Error getting product:', error, resetColor);
        res.status(500).json({ message: 'Error getting product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newProduct = await Product.create({ name, description, price });
        console.log(successColor, "Product created successfully", resetColor);
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error) {
        console.error(errorColor, error.message, resetColor);
        res.status(500).json({ message: "Error adding a product" });
    }
};

module.exports = {
    getProductByID,
    createProduct
};
