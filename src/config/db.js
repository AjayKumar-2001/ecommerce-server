const mongoose = require("mongoose")

const mondbUrl="mongodb+srv://1804ajaykumar:z8hck7mxOwsr6qOh@cluster0.pkkvijq.mongodb.net/?retryWrites=true&w=majority"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}