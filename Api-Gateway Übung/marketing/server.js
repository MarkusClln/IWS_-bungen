
const express = require('express');
const mongoose = require("mongoose");

// Constants
const PORT = process.env.PORT;
const DB_Port = "27017";
const DB_NAME = "marketing";


//Routes
const campaignRoute = require("./routes/campaign");


// App
const app = express();

connect_db();


app.use('/', campaignRoute );

app.listen(PORT, () => console.log("Listen to port "+PORT));


function connect_db() {

    if (process.env.DB_IP == undefined) {
        console.log("No database ip declared");
        process.exit(1);
    } else {
        const DB_IP = process.env.DB_IP;

        const connection_string = "mongodb://"+DB_IP+":"+DB_Port+"/"+DB_NAME;
        console.log(connection_string);


        mongoose.connect(connection_string, {useNewUrlParser: true, useUnifiedTopology: true});
        const  db = mongoose.connection;
        db.on('error',function(error){
            console.log('CONNECTION ERROR:',error);
            process.exit(1);
        });
        db.once('open', function() {
            console.log("Connected to database");
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
        });

    }

}