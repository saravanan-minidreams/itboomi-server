import { rssErrorResponse } from "../Res/res.js";
import { fetchBlogPosts } from "../Db/getBlogData.js";
import { generateRSSFeed } from "../Utils/rssUtils.js";
import { fetchBlog } from "../Db/getSingleBlogData.js";
import { saveBlog } from "../Db/postBlogData.js";
// Base_URL-----------------------------------------------------------
export const getWelcomeMessage = () => {
  return "Welcome to the itboomi.....";
};

//Unknown_URL --------------------------------------------------------
export const redirectBaseUrl = () => {
  return `<h1>Page not found</h1> <a href="/">Click here to go to homepage</a>`;
};

//Rss feed file-------------------------------------------------------
export const rssServices = async (req, res) => {
  try {
    const blogPosts = await fetchBlogPosts();
    const rssFeed = generateRSSFeed(blogPosts);
    res.type("application/xml");
    res.send(rssFeed);
  } catch (error) {
    rssErrorResponse(error);
  }
};

//get all blogs data --------------------------------------------------
export const blogsServices = async (req, res) => {
  try {
    const blogs = await fetchBlogPosts();
    res.send(blogs);
  } catch (error) {
    rssErrorResponse(error);
  }
};

//get single blog data ------------------------------------------------
export const blogServices = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure id is defined and valid (you may want to add additional validation)
    if (!id) {
      throw new Error("Blog ID is missing");
    }
    // Fetch blog data based on id
    const blog = await fetchBlog(id);
    if (!blog) {
      throw new Error("Blog not found");
    }
    // Send response back to client
    res.send(blog);
  } catch (error) {
    console.error("Error in blogServices:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Post blog data ------------------------------------------------------
export const postBlogServices = (req, res) => {
  saveBlog(req, res);
};
