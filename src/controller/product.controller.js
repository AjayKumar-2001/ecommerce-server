const productService = require("../services/product.service");

const createProduct = async (req, res)=>{
    try{
        const product = await productService.createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const deleteProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const product = await productService.deleteProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const updateProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const product = await productService.updateProduct(productId,req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const findProductById = async (req,res)=>{
    const productId = req.params.id;
    console.log(productId)
    try{
        const product = await productService.findProductById(productId,req.body);
        console.log(product)
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const getAllProducts = async (req,res)=>{
    const productId = req.params.id;
    try{
        // console.log(req.query)
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(products);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const createMultipleProduct = async (req,res)=>{
    const productId = req.params.id;
    try{
        const products = await productService.createMultipleProduct(req.query);
        return res.status(201).send({message:"products Created Successfully"});
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById,
}