/**
 * File: server.js
 * Author: Sunil Balami
 * StudentID: 200578456
 * Date: 2024-10-13
 * Description: This is ssssthe main entry point of application. It create the server and connect itself to Mongodb
 */

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require("./src/routes/userRoutes")
const app = express();

const PORT = process.env.PORT || 3000;
const MongodbURI = "mongodb+srv://sunil:sunil123@cluster0.df1iq.mongodb.net/";

/**Mongodb Connection
 * Connect to mongo db with given URI for the varioud Database operations
 **/
mongoose.connect(MongodbURI,{

    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Success fully Connected to MongoDB'))
.catch((err) => console.error(err));

//parshing JSON requests
app.use(express.json());


app.use(session({
    secret: "sunil",
    resave: false,
    saveUninitialized: false
}));

//All Routes goes here
//testing endpoint
app.get('/test', (req, res) => {
    res.send('I am testing');
})


app.use('/api/user', authRoutes) //Base URL for User Auth


//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
