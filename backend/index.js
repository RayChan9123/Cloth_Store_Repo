import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Cloth } from "./models/clothModel.js";
import clothesRoute from './routes/clothesRoute.js'

const app = express();

//Middleware for paring request body
app.use(express.json());

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
