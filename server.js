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

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/sitemap.xml", async (req, res) => {
  try {
    // Send sitemap.xml file
    res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
    // await generateSitemap();
  } catch (error) {
    console.error("Error handling /sitemap.xml request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Unknown_URL ------------------------------------------------------------------
app.get("*", unknownUrl);
// Call the function to start the server (From Server/startServer.js Folder)
startServer();
