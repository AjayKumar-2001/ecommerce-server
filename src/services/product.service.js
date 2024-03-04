const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData){
    let topLevel = await Category.findOne({name :reqData.topLavelCategory});
    if(!topLevel){
        topLevel = new Category({
            name: reqData.topLavelCategory,
            level:1
        })
        
        await topLevel.save()
    }
    
    console.log(reqData)
    let secondLevel = await Category.findOne({
        name:reqData.secondLavelCategory,
        parentCategory: topLevel._id,
    })

    if(!secondLevel){
        secondLevel = new Category({
            name: reqData.secondLavelCategory,
            parentCategory:topLevel._id,
            level:2
        })
        await secondLevel.save()
    }
    console.log(secondLevel)
    let thirdLevel = await Category.findOne({
        name:reqData.thirdLavelCategory,
        parentCategory:secondLevel._id,
    })

    console.log(thirdLevel)
    if(!thirdLevel){
        thirdLevel = new Category({
            name: reqData.thirdLavelCategory,
            parentCategory:secondLevel._id,
            level:3,
        })

        await thirdLevel.save()
    }
    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountedPresent:reqData.discountedPresent,
        imageUrl: reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        category:thirdLevel._id,

    })  

    return await product.save();

}
 
async function deleteProduct(productId){
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully";
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);
}

async function findProductById(id){
    const product = await Product.findById(id).populate("category");

    if(!product){
        throw new Error("Product not found with id"+ id);
    }
    return product;
}

async function getAllProducts(reqQuery){
    let {category,colors,size,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize} = reqQuery;
    pageSize=pageSize || 10;

    // console.log(reqQuery)

    minPrice = minPrice.trim()
    // console.log(minPrice, minPrice)
    let query = Product.find().populate("category");

    if(category){
        const existCategory = await Category.find({name:category});
        // console.log(existCategory)
        
        if(existCategory){
            query = query.where("category._id").equals(existCategory._id);
        }
        else {
            return {content:[],currentPage:1,totalPages:0}
        }
    }
    if(colors){
        const colorSet = new Set(colors.split(",").map(color=>color.trim().toLowerCase()));
        // console.log(colorSet)

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"): null;

        query = query.where("color").regex(colorRegex);
    }   
    // if(size){
    //     console.log(size)
    //     const sizesSet = new Set(size);
    //     query=query.where("sizes.name").in([...sizesSet]);
    // }
    if(minPrice && maxPrice !== '0'){
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    if(minDiscount){
        // console.log(minDiscount)
        query = query.where('discountedPresent').gte(minDiscount);
    }
    
    if(stock){
        if(stock=="in_stock"){
            query = query.where("quantity").gt(0);
        }
        else if(stock=="out_of_stock"){
            console.log(stock)
            query = query.where("quantity").lte(0)
        }
    }
    
    if(sort){
        const sortDirection=sort==="price_hight"?-1:1;
        query=query.sort({discountedPrice:sortDirection})
    }

    const totalProducts=await Product.countDocuments(query);
    console.log(pageSize)
    const skipNumber = (pageNumber-1)*pageSize;
    console.log(pageNumber, pageSize, skipNumber)

    query = query.skip(skipNumber).limit(pageSize);
    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);

    return {content:products,currentPage:pageNumber,totalPages};
}

async function createMultipleProduct(products){
    for(let product of product){
        await createProduct(product);
    }
}

module.exports={
    createProduct,
    deleteProduct,

    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
}