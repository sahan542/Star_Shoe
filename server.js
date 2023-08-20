import express from 'express';
import colors  from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//const dbURI = 'mongodb+srv://star_shoe:%23A991572929v%26@cluster1.q7svok4.mongodb.net/';

//configure env
dotenv.config();

//databse config
connectDB();


//rest object
const app= express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//rest api
app.get('/' , (req,res) => {
    res.send("<h1>Welcome to E-Commerce App</h1>"

    );
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log('Server Running On ${process.env.DEV_MODE} mode on port ${PORT}' .bgCyan.white);
});