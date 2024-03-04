const app = require(".");
const { connectDb } = require("./config/db");

const PORT = 5454;
app.listen(PORT, async()=>{
    await connectDb().then(() => {
        console.log("Data Base connected Successfully")
    }).catch(err => {
        console.log(err)
    });
    console.log("ecommerce api listing on PORT : ",PORT);
})