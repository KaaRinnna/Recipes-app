import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/Users.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();

    res.json({ message: "User registered successfully!" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exists"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Username or password isn't correct" });
        }
        const token = jwt.sign({ id: user._id }, secret);
        res.json({ token, userID: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}