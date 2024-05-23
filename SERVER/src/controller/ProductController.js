const {Product} = require('../models/product');

const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id);
        const selectedProduct = await Product.findByPk(id);

        if (!selectedProduct) {
            const message = 'Product not found';
            console.log(errorColor, 'Product not found', resetColor);
            return res.status(401).json({ message });
        }

        const message = 'Product found: ';
        res.status(200).json({ message, selectedProduct });

    } catch (error) {
        console.error(errorColor, 'Error getting products:', error, resetColor);
        res.status(500).json({ message: 'Error getting products' });
    }
};

module.exports = {
    getProductByID,
}