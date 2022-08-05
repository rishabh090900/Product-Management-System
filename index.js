const express = require('express');
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/product")
const app = express();
app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result)
})
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user)
            resp.send(user);
        else
            resp.send({ result: "no user found" });
    }
    else
        resp.send({ result: "enter complete details" });
})
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/product", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "no product found" })
    }

})
app.delete("/product/:id", async (req, resp) => {
    let results = await Product.deleteOne({ _id: req.params.id });
    resp.send(results)
})
app.get("/product/:id", async (req, resp) => {
    let results = await Product.findOne({ _id: req.params.id });
    if (results) {
        resp.send(results)
    }
    else {
        resp.send("results not found")
    }
})
app.put("/product/:id", async (req, resp) => {
    let results = await Product.updateOne({ _id: req.params.id },
        { $set: req.body });
        resp.send(results)
})
app.get("/search/:key", async (req, resp) => {
    let results = await Product.find({ 
        "$or":[
            {
                name:{$regex:req.params.key}
            },
            {
                company:{$regex:req.params.key}
            },
            {
                category:{$regex:req.params.key}
            }
        ]


     });
    if (results) {
        resp.send(results)
    }
    else {
        resp.send("results not found")
    }
})

app.listen(5000);