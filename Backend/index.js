import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import shopsRoute from './routes/shopsRoute.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
// allow all origins w/ default of cors(*)
app.use(cors());

/* custom origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders['Content-Type']
    })
);
*/

// basic format of routes
app.get('/', (req, resp) => {
    console.log(req);
    return resp.status(234).send("Hello World! Server is up");
});

// middleware for our routes
app.use('/shops', shopsRoute)

// runs the server and connects to DB, else logs error
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
