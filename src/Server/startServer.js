import { app } from "../Api/Middlewares/middlewares.js";
import { PORT } from "../Config/environment.js";

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port : http://localhost:${PORT}`);
  });
};
