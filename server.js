// server.js
import { app } from "./src/Api/Middlewares/middlewares.js";
import routes from "./src/Api/Routes/routes.js";
import { baseUrl, unknownUrl } from "./src/Api/Controllers/controllers.js";
import { startServer } from "./src/Server/startServer.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mount the user data routes middleware at the specified BASE_URL (From Routes Folder)
app.use(routes);

// Base_URL --------------------------------------------------------------------
app.get("/", baseUrl);

// Unknown_URL ------------------------------------------------------------------
app.get("*", unknownUrl);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Call the function to start the server (From Server/startServer.js Folder)
startServer();

