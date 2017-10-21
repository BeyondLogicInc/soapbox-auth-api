const express = require('express');
const router = express.Router();
const Article = require('../models/article');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
    res.json({success: true});
});
