import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;
export const BASE_URL = process.env.BASE_URL || "/";
