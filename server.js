import express from "express";
import { fetchBlogPosts } from "./fetchBlogPosts.js";
import { generateRSSFeed } from "./feed.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/feed", async (req, res) => {
  try {
    const blogPosts = await fetchBlogPosts();
    const rssFeed = generateRSSFeed(blogPosts);
    res.type("application/xml");
    res.send(rssFeed);
  } catch (error) {
    res.status(500).send("Error generating RSS feed");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
