//server/routes/routes.js
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Feeding = require('../models/Feeding.js');


router.get('/', function (req, res) {
    res.render('index')
});

// @TODO redo routes in a more RESTful way

router.route('/insert')
    .post(function (req, res) {
        var feeding = new Feeding();
        feeding.date = req.body.date;
        feeding.foodType = req.body.foodType;
        feeding.foodAmountInGrams = req.body.foodAmountInGrams;
        feeding.location = req.body.location;
        feed.numberOfDucks = req.body.numberOfDucks;
        
        feeding.save(function (err) {
            if (err)
                res.send(err);
            res.send('Feeding successfully added!');
        });
    });

router.route('/feeding')
    .post(function (req, res) {
        const doc = {
            date: req.body.date,
            foodType: req.body.foodType,
            foodAmountInGrams: req.body.foodAmountInGrams,
            location: req.body.location,
            numberOfDucks: req.body.numberOfDucks
        };
        console.log(doc);
        Feeding.update({ _id: req.body._id }, doc, function (err, result) {
            if (err)
                res.send(err);
            res.send('Feeding successfully updated!');
        });
    });

router.get('/delete', function (req, res) {
    var id = req.query.id;
    Feeding.find({ _id: id }).remove().exec(function (err, expense) {
        if (err)
            res.send(err)
        res.send('Feeding successfully deleted!');
    })
});

router.get('/getAll', function (req, res) {
    var monthRec = req.query.month;
    var yearRec = req.query.year;
    if (monthRec && monthRec != 'All') {
        Feeding.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, feedings) {
            if (err)
                res.send(err);
            res.json(feedings);
        });
    } else {
        Feeding.find({ year: yearRec }, function (err, feedings) {
            if (err)
                res.send(err);
            res.json(feedings);
        });
    }
});

module.exports = router;