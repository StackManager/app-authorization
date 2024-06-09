//Aliases configurations short ubications files
import './aliases/alias.configuration';

//Express modules
import express from "express";
import "express-async-errors";

//Anothers functions
import { json } from "body-parser";
// import { NotFoundError } from "./helpers";

//Cors configurarion and accessibility
import cookieSession from 'cookie-session';
import cors from "cors";


const app = express();
app.use(json());
app.use(cors({
  //origin: 'http://localhost:5173',
  origin: '*',
  credentials: true,
  //exposedHeaders: ['X-Time-Remaining-Session'] 
}));

// Configura el middleware de cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['myconfigurationkeylocalhost1', 'myconfigurationkeylocalhost2'],
  maxAge: 24 * 60 * 60 * 1000,
  secure: false,
  sameSite: "lax"
}));


// app.all("*", async (req, res) => {
//   throw new NotFoundError();
// });

export {app}