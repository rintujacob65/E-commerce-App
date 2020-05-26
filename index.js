const express = require('express');
const setupDB = require('./config/database');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

require("dotenv").config();

//import routes
const authRoutes = require('./config/routes/auth');
const userRoutes = require('./config/routes/user');
const categoryRoutes = require('./config/routes/category');
const productRoutes = require('./config/routes/product');
const braintreeRoutes = require('./config/routes/braintree');
const orderRoutes = require('./config/routes/order');

//app
const app = express();

//db

setupDB()

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
