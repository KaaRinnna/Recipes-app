import express from 'express';
import cors from "cors"; // устанавливает правила коммуникации между фронт и бэк
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import {recipesRouter} from "./routes/recipes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://kumira:${mongoPassword}@recipes.ftdjuhb.mongodb.net/Recipes?retryWrites=true&w=majority&appName=Recipes`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(3001, () => console.log("SERVER STARTED")); //npm start
}

run().catch(console.dir);

