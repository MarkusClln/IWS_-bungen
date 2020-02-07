const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const requestPromise = require('request-promise');
const config = require('../config/default.json');


const basketURL= "http://localhost:" +config.Nodes.basketPORT;
const marketingURL= "http://localhost:" + config.Nodes.marketingPORT;
const productURL= "http://localhost:" + config.Nodes.productPORT;
const paymentURL= "http://localhost:" + config.Nodes.paymentPORT;


//Warenkorb anzeigen: GET /basket/<customerId> + GET /product/<productId> + GET /marketing/<productId>
//Checkout: GET /basket/<customerId> + GET /product/<productId> + POST /payment
//????Produkt abfragen: GET /product/<productId> + GET /marketing/<productId>????

router.post('/checkout/:customerId', async function(req, res, next){
    res.setHeader("Content-Type", "application/json");

    const basketOptions = {
        method: 'GET',
        uri: basketURL + "/" + req.params.customerId
    };

    //GET basket by customerId
    var customerBasket = await requestPromise(basketOptions)
        .then(function (response) {
            return JSON.parse(response);
        });

    var fullPrice = 0;

    //Iterate over all items in basket
    for (var i = 0; i < customerBasket.items.length; i++) {
        var item = customerBasket.items[i];

        const productOptions = {
            method: 'GET',
            uri: productURL + "/" + item.productId
        };
        //GET product by id
        var product = await requestPromise(productOptions)
            .then(function (response) {
                return JSON.parse(response);
            });

        //discount
        const marketingOptions = {
            method: 'GET',
            uri: marketingURL + "/" + product.productId
        };
        var discount = 0;
        //Get marketingcampaigns by productid
        await requestPromise(marketingOptions)
            .then(function (response){
                var marketing = JSON.parse(response);
                for (var j = 0; j < marketing.length; j++) {
                    //check if discount of response is higher then current saved discount
                    if(discount < Number(marketing[j].productDiscount)){
                        discount = Number(marketing[j].productDiscount);
                    }
                }
            });

        fullPrice += (product.productPrice - discount);
    }


    for (var j = 0; j < customerBasket.items.length; j++) {
        delete customerBasket.items[j].customerBasketId;
    }


    const paymentOptions = {
        method: 'POST',
        uri: paymentURL + "/",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        json: true,
        body: {
            items : customerBasket.items,
            billNumber : Math.floor(Math.random() * Math.floor(9999999)),
            customerId : parseInt(req.params.customerId),
            price : fullPrice
        }
    };


    await requestPromise.post(paymentOptions)
        .then(function (response) {
            return response;
        });


    res.send("Created payment");
});


router.get('/showBasket/:customerId', async function(req, res, next){
    res.setHeader("Content-Type", "application/json");

    const basketOptions = {
        method: 'GET',
        uri: basketURL + "/" + req.params.customerId
    };

    //GET basket by customerId
    const customerBasket = await requestPromise(basketOptions)
        .then(function(response){
            return JSON.parse(response);
        });

    //Iterate over all items in basket
    var returnValue = customerBasket;

    for(var i = 0; i<customerBasket.items.length; i++){
        var item = customerBasket.items[i];

        const productOptions = {
            method: 'GET',
            uri: productURL + "/" + item.productId
        };
        //GET product by id
        var product = await requestPromise(productOptions)
            .then(function(response){
                return JSON.parse(response);
            });

            // const marketingOptions = {
            //     method: 'GET',
            //     uri: "http://" + marketingURL + "/" + item.productId
            // };

        //discount

        const marketingOptions = {
            method: 'GET',
            uri: marketingURL + "/" + product.productId
        };

        var discount = 0;
        //Get marketingcampaigns by productid
        await requestPromise(marketingOptions)
            .then(function (response){
                var marketing = JSON.parse(response);
                for (var j = 0; j < marketing.length; j++) {
                    //check if discount of response is higher then current saved discount
                    if(discount < Number(marketing[j].productDiscount)){
                        discount = Number(marketing[j].productDiscount);
                    }
                }
            });


        returnValue.items[i].productDiscount = discount;
        returnValue.items[i].productName = product.productName;
        returnValue.items[i].productDescription = product.productDescription;
        returnValue.items[i].productPrice = product.productPrice;
        returnValue.items[i].productQuantity = product.productQuantity;
    }
    res.send(returnValue);
});

//Get-Request der alle Produkte samt Discount zurückgibt
router.get('/allProducts', async function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    //setze Request Optionen
    const productOptions = {
        method: 'GET',
        uri: productURL
    };

    //gemergde Daten von Produktservice und Marketingservice
    //wird returned
    var newProducts = [];

    //Frage alle Produkte ab
    var allProducts = await requestPromise(productOptions)
        .then(function (response) {
            return JSON.parse(response);
        });

    //iteriere über alle zurückgegebene Produkte
    for (var i = 0; i < allProducts.length; i++) {
        var product = allProducts[i];

        //Set request options
        const marketingOptions = {
            method: 'GET',
            uri: marketingURL+"/"+product.productId
        };

        //discount
        var discount = 0;

        //send request
        await requestPromise(marketingOptions)
            .then(function (response){
                var marketing = JSON.parse(response);
                for (var j = 0; j < marketing.length; j++) {
                    //check if discount of response is higher then current saved discount
                    if(discount < Number(marketing[j].productDiscount)){
                        discount = Number(marketing[j].productDiscount);
                    }
                }
                //add new attribute productDiscount to product and add it to the return collection
                product.productDiscount = discount;
                newProducts.push(product);
            });
    }
    res.send(newProducts);

});


router.get("/seedData", async function (req, res, next) {

    const productOptions = {
        method: 'POST',
        uri: productURL + "/",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        json: true,
        body: {
            productId: 1,
            productName: "Apfel",
            productDescription: "Vom Apfelbaum",
            productPrice: 20,
            productQuantity: 5
        }
    };

    await requestPromise.post(productOptions)
        .then(function (response) {
           console.log(response);
        });


    productOptions.body = {
        productId: 2,
        productName: "Kartoffel",
        productDescription: "Ausm Dreck",
        productPrice: 40,
        productQuantity: 7
    };


    await requestPromise.post(productOptions)
        .then(function (response) {
            console.log(response);
        });

       productOptions.body = {
           productId: 3,
           productName: "Birne",
           productDescription: "Ausm Italien",
           productPrice: 5,
           productQuantity: 46
       };

    await requestPromise.post(productOptions)
           .then(function (response) {
               console.log(response);
           });


       const marketingOptions = {
           method: 'POST',
           uri: marketingURL + "/",
           headers: {
               'Content-Type': 'application/json; charset=utf-8'
           },
           json: true,
           body: {
               marketingId: 1,
               productId: 1,
               productDiscount: 5
           }
       };

    await requestPromise.post(marketingOptions)
           .then(function (response) {
               console.log(response);
           });

       marketingOptions.body = {
           marketingId: 2,
           productId: 3,
           productDiscount: 1
       };

    await requestPromise.post(marketingOptions)
           .then(function (response) {
               console.log(response);
           });

   res.send("Created Data")
});

module.exports = router;