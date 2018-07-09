var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Feeding = require('../models/Feeding.js');

// Homepage load
router.get('/', function (req, res) {
    res.render('index')
});

// Get all feedings
router.get('/feedings', function (req, res) {
    Feeding.find(function (err, feedings) {
        if (err)
            res.send(err);
        res.json(feedings);
    });
});

// Create new feeding entry
router.route('/feeding')
    .post(function (req, res) {
        var feeding = new Feeding();
        feeding.date = req.body.date;
        feeding.foodType = req.body.foodType;
        feeding.foodAmountInGrams = req.body.foodAmountInGrams;
        feeding.location = req.body.location;
        feeding.numberOfDucks = req.body.numberOfDucks;
        
        feeding.save(function (err) {
            if (err)
                res.send(err);
            res.send('Feeding successfully added!');
        });
    });

module.exports = router;