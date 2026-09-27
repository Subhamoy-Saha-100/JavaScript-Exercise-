require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const upload = require("./middleware/upload");
const cloudinary = require("./config/cloudinary");
const Image = require("./models/image");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        const images = await Image.find().sort({ _id: -1 });
        res.render("index", { name: "Ayush Banik", images });
    } catch (error) {
        console.error("Failed to load images:", error);
        res.status(500).send("Failed to load images");
    }
});

app.post("/addImage", upload.single("image"), async (req, res) => {
    try {
        const description = req.body.description;

        if (!req.file) {
            return res.status(400).send("Please select an image");
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "ayush_photos" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(req.file.buffer);
        });

        await Image.create({
            imageUrl: result.secure_url,
            description: description
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload failed");
    }
});

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not configured");
        }

        await mongoose.connect(process.env.MONGO_URI);
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exitCode = 1;
    }
}

startServer();
