import express from "express";
import '../database';
import { routes } from "./routes";

const app = express()
app.use(express.json())
/* 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('    Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.use(routes);

app.listen(3333, () => console.log("Server running on port 3333..."))