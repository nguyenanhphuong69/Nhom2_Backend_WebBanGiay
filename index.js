const express = require('express')
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express()
const port = 5000

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!abc')
})

//cổng admin
const adminRouter = require("./routers/admin.router.js");
//cổng customer 
const customerRouter = require("./routers/customer.router.js");
//cổng product
const productRouter = require("./routers/product.router.js");
//cổng cart
const cartRouter = require("./routers/cart.router.js");
//cổng bill
const billRouter = require("./routers/bill.router.js");
//cổng billDetail
const billDetailRouter = require("./routers/billDetail.router.js");
//cổng category
const categoryRouter = require("./routers/category.router.js")

app.use("/admin/", adminRouter);
app.use("/customer/", customerRouter);
app.use("/product/", productRouter);
app.use("/cart/", cartRouter);
app.use("/bill/", billRouter);
app.use("/billDetail/", billDetailRouter);
app.use("/category/", categoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})