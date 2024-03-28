import express from "express";
import clientRouter from "./routs/client.js"
import { connectToDB } from "./db/connnectToDb.js"
import { config } from "dotenv";
import cors from "cors";
import { errorHandling } from "./middlwares/errorHandling.js";


const app = express();
app.use(cors())
app.use(express.json());
app.use
connectToDB();
config();


app.use("api/all", express.static("files"))
app.use("/api/client", clientRouter);


app.use(errorHandling)

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
