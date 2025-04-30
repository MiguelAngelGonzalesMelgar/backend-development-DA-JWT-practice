import { Request, Response } from "express";
import userModel from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

// simulate autoincremental ID

let userIdCounter = 1;

export const register = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const userExists = userModel.users.find( user => user.email === email);
    if (userExists) {
        return res.status(400).json( { message: "Email already registered" } );
        }

    const hashedPassword = await hashPassword(password);
    const newUser = { id: userIdCounter++, email, password: hashedPassword}

    userModel.users.push(newUser);
    res.status(201).json({ message: "User successfully registered"});
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = userModel.users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: "Invalid Credentials"});
    }

    const matchPasswords = await comparePassword(password, user.password);

    if (!matchPasswords) {
        return res.status(400).json( { message: "Invalid Credentials"});
    }

    const token = signToken({ id: user.id, email: user.email });
    res.json({ token });
}