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

//Route for getting all cloths
app.get('/getclothes', async (req, res) => {
    try {
        const cloths = await Cloth.find();
        return res.status(200).json(
            {
                count: cloths.length,
                data: cloths
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for getting a cloth by id
app.get('/getcloth/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cloth = await Cloth.findById(id);
        if (!cloth) {
            return res.status(404).send({ message: "Cloth not found" });
        }
        return res.status(200).json(cloth);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for updating a cloth
app.put('/updatecloth/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cloth = await Cloth.findById(id);
        if (!cloth) {
            return res.status(404).send({ message: "Cloth not found" });
        }
        const updatedCloth = await Cloth.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).send({ message: 'Cloth updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for deleting a cloth
app.delete('/deletecloth/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const cloth = await Cloth.findById(id);
        if (!cloth) {
            return res.status(404).send({ message: "Cloth not found" });
        }

        const result = await Cloth.findByIdAndDelete(id);

        return res.status(200).send({ message: 'Cloth deleted successfully' });
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
