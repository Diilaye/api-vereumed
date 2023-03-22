const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./config/db');

const app = express();


require('dotenv').config({
    path: './.env'
});

app.use(cors());

app.use(bodyParser.json({
    limit: '10000mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10000mb'
}));

app.get('/',(req,res,next)=>{
    res.send('Ici la  terre');
});

const authRoute  = require('./routes/auth');

app.use('/api/v1/users' , authRoute); 


db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});
