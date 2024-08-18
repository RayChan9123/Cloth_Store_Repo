import express from "express";
import { Cloth } from "../models/clothModel";

const router = express.Router()

//Route for saving a new cloth
app.post('/', async (req, res) => {
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
app.get('/', async (req, res) => {
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
app.get('/:id', async (req, res) => {
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
app.put('/:id', async (req, res) => {
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
app.delete('/:id', async (req, res) => {
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

export default router;