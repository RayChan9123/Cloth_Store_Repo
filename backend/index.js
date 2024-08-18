import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Cloth } from "./models/clothModel.js";

const app = express();

//Middleware for paring request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Hello World');
})

//Route for saving a new cloth
app.post('/savecloth', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.price ||
            !req.body.description
        ) {
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const newCloth = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        }
        const cloth = await Cloth.create(newCloth);

        return res.status(201).send(cloth)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


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
