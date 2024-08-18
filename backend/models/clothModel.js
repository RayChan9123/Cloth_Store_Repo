import mongoose from "mongoose";

const clothSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Cloth = mongoose.model('Cloth1', clothSchema);