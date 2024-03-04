const reviewService = require("../services/review.service");
const { findProductById } = require("./product.controller");

const createReview = async(res,req)=>{

    const user = req.user;
    try {
        const review = await reviewService.createReview(req.body,user);
        return res.status(201).send(review);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllReview = async(res,req)=>{

    const user = req.user;
    try {
        const reviews = await reviewService.getAllReivew(ProductById);
        return res.status(201).send(reviews);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    createReview,
    getAllReview,
}