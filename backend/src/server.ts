import { Request, Response, Application } from "express";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";


dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!, Typescript + Express! 💯🚀🎯");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
