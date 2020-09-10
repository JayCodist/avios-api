let mongoose = require("mongoose");

//Require the dev-dependencies
let chaiHttp = require('chai-http');
const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const Product = require('../models/product.js');


chai.use(chaiHttp);

module.exports = { server, expect, should, Product, chai }