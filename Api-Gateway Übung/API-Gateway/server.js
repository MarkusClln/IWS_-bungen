const express = require('express');
const httpProxy = require('express-http-proxy');
const config = require('./config/default.json');


// Constants
const PORT = config.Gateway.port;
const basketURL= "http://localhost:" +config.Nodes.basketPORT;
const marketingURL= "http://localhost:" + config.Nodes.marketingPORT;
const productURL= "http://localhost:" + config.Nodes.productPORT;
const paymentURL= "http://localhost:" + config.Nodes.paymentPORT;

//Routes
const compositionRoute = require("./routes/composition");

// App
const app = express();

app.get('/', (req, res) => {
    res.send('API-Gateway is running');
});

//proxy
app.use('/marketing', httpProxy(marketingURL));
app.use('/basket', httpProxy(basketURL));
app.use('/product', httpProxy(productURL));
app.use('/payment', httpProxy(paymentURL));

app.use('/api', compositionRoute);

app.listen(PORT, () => console.log("Listen to port "+PORT));
