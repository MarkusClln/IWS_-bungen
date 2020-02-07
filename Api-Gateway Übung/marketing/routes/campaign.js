const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const campaignSchema = require("../models/campaignSchema");

/* get all campaigns */
router.get('/', function(req, res, next) {
    campaignSchema.find({}, function (err, campaigns) {
        res.json(campaigns);
    })
});
/* create new campaign */
router.post("/", function (req, res, next) {

    const campaign = new campaignSchema({
        _id: new mongoose.Types.ObjectId(),
        marketingId: req.body.marketingId,
        productId: req.body.productId,
        productDiscount: req.body.productDiscount
    });

    campaign
        .save()
        .then(result => {
            res.status(201).json({
                message: "campaign created"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
        })
    });
});

/* get campaign by product id*/
router.get("/:id", function (req, res, next) {
    campaignSchema.find({ "productId" : req.params.id},
        function (err, campaigns) {
            if (err) return console.error(err);
            res.json(campaigns);
        });
});

module.exports = router;