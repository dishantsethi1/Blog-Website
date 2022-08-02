import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
const path = require('path');

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

// deployment........
__dirname = path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}else{
    app.get('/',(req,res) =>{
        res.send("Api is running...");
    });
}


const PORT =process.env.PORT|| 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const URL=process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@cluster0.ft3sv.mongodb.net/?retryWrites=true&w=majority`;
Connection(URL);

