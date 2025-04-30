import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!, Typescript + Express! 💯🚀🎯");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

