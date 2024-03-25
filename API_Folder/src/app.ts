//********** Imports **********//
import express from "express";
import cors from "cors";

import avionController from "./pages/interfaces/avionController";
import mecanicienController from "./pages/interfaces/mecanicienController";
import entretienController from "./pages/interfaces/entretienController";

import * as middlewares from "./middlewares";

require("dotenv").config();

//********** Server **********//
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
// Initializing express.
const app = express();
// Enable CORS
app.use(cors(options));
// Middleware to parse json throught requests.
app.use(express.json());

// Middleware to define the route to avion controller.
app.use("/avions", avionController);
app.use("/mecaniciens", mecanicienController);
app.use("/entretiens", entretienController);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
