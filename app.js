const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./config/db');

const request = require('request');


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

app.use('/api/v1/users' , authRoute); 


request('https://base-donnees-publique.medicaments.gouv.fr/index.php', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});

db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});
