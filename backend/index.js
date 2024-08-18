import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Cloth } from "./models/clothModel.js";
import clothesRoute from './routes/clothesRoute.js'
import cors from 'cors'

const app = express();

//Middleware for paring request body
app.use(express.json());

//Middleware for handling CORS POLICY
// Opt1: Allow All origins with default of cors(*)
app.use(cors())
// Opt2: Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:4000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );



app.get('/', (req, res) => {
    console.log(req);
    return res.send('Hello World');
})

app.use('/clothes', clothesRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
