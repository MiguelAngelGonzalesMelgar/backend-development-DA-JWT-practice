import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET!;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!, Typescript + Express! 💯🚀🎯");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

