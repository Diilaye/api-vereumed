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

app.use('/verumed-file', express.static('uploads'));


const authRoute  = require('./routes/auth');

const fileRoutes  = require('./routes/file');

const rvRoutes  = require('./routes/rv');

app.use('/api/v1/users' , authRoute); 

app.use('/api/v1/files' , fileRoutes); 

app.use('/api/v1/rv' , rvRoutes); 


db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});
