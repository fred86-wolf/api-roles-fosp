import Product from '../models/Product';

export const createProduct = async (req,res) => {
    const {name, category, price, imgUrl} = req.body;

    const product = new Product({name,category,price,imgUrl});

    const productSaved = await product.save();

    res.status(200).json({
        ok:true,
        message: 'Product Saved!',
        data:productSaved
    });
}
export const getProducts = async (req,res) => {
   const products = await Product.find();
   res.status(200).json({
       ok:true,
       message:'Products Found!',
       data:products
   });
}
export const getProduct = async (req,res) => {
    const {productId} = req.params;
    const product = await Product.findById(productId);
    res.status(200).json({
        ok:true,
        message:'Product Found!',
        data:product
    });
}
export const updateProduct = async (req,res) => {
    const {productId} = req.params;
    const product = req.body;
    const productUpdated = await Product.findByIdAndUpdate(productId,product, {new:true});

    res.status(200).json({
        ok:true,
        message:'Product Successfully Updated!',
        data:productUpdated
    });
}
export const deleteProduct = async (req,res) => {
    const {productId} = req.body;
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).json({
        ok:true,
        message:'Product Deleted',
        data:product
    });
}