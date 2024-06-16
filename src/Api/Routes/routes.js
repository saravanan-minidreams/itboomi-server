import express from "express";
import {
  blogsController,
  getBlogController,
  getSitemapController,
  postBlogController,
  rssControllers,
} from "../Controllers/controllers.js";

const router = express.Router();

// route to get rss file ---------------------------------------
router.get("/feed", rssControllers);
export default router;

// Get all blogs data ------------------------------------------
router.get("/all/blogs", blogsController);

// Get single blog data ----------------------------------------
router.get("/blog/:id", getBlogController);

// Post blog request -------------------------------------------
router.post("/save/blog", postBlogController);

// Get sitemap -------------------------------------------------
router.get("/sitemap", getSitemapController);
