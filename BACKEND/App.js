import express, { json } from "express"; //Import express
import http from "http"
import socketIO from 'socket.io';
import { Socket} from "./Socket" // Import socket
import cors from "cors"; // import cors
import db from "./database/DB"
const app = express(); //execute express
const port = 3001; //create port

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  db();
});
//Middlewares Cors & Json 
app.use(cors())
app.use(express.json())

export default app;















