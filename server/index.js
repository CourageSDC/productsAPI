require('dotenv').config();
const express = require('express');
const db = require('../db');
const productRouter = require('./routes.js');

const app = express();
app.use(express.json());
app.use(productRouter);

const port = process.env.PORT || 3000;
app.listen(PORT)
console.log(`Big brother is listening at http://localhost:${PORT}`);