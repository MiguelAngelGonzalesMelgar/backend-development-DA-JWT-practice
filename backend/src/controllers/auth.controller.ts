import { Request, Response } from "express";
import userModel from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

// simulate autoincremental ID

let userIdCounter = 1;

const register = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    const userExists = userModel.users.find( user => user.email === email);
    if (userExists) {
        res.status(400).json( { message: "Email already registered" } );
        return;
        }

    const hashedPassword = await hashPassword(password);
    const newUser = { id: userIdCounter++, email, password: hashedPassword}

    userModel.users.push(newUser);
    res.status(201).json({ message: "User successfully registered"});
}

const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = userModel.users.find(user => user.email === email);

    if (!user) {
        res.status(400).json({ message: "Invalid Credentials"});
        return;
    }

    const matchPasswords = await comparePassword(password, user.password);

    if (!matchPasswords) {
        res.status(400).json( { message: "Invalid Credentials"});
        return;
    }

    const token = signToken({ id: user.id, email: user.email });
    res.json({ token });
}

export default {
    register,
    login,
}