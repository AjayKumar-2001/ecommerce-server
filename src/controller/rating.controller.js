const ratingService = require("../services/rating.service");
const { findProductById } = require("./product.controller");

const createRating = async(res,req)=>{

    const user = req.user;
    try {
        const review = await ratingService.createRating(req.body,user);
        return res.status(201).send(review);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllRatings = async(res,req)=>{

    const user = req.user;
    try {
        const reviews = await reviewService.getAllRatings(ProductById);
        return res.status(201).send(reviews);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    createRating,
    getAllRatings
}