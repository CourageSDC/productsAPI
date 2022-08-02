require('dotenv').config();
const express = require('express');
const compression = require('compression');
const db = require('../db');
const productRouter = require('./routes.js');

const app = express();
app.use(compression());
app.use(express.json());
app.use('/products', productRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Big brother is listening at http://localhost:${PORT}`);
