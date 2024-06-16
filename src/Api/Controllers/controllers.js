import {
  blogServices,
  blogsServices,
  getSitemapServices,
  getWelcomeMessage,
  postBlogServices,
  redirectBaseUrl,
  rssServices,
} from "../Services/services.js";

//base_URL--------------------------------------------------------------
export const baseUrl = (req, res) => {
  const message = getWelcomeMessage();
  res.status(200).send(message);
};

//Unknown_URL-----------------------------------------------------------
export const unknownUrl = (req, res) => {
  const message = redirectBaseUrl();
  res.status(404).send(message);
};

//Create Rss -----------------------------------------------------------
export const rssControllers = async (req, res) => {
  await rssServices(req, res);
};

//get all blogs data ---------------------------------------------------
export const blogsController = async (req, res) => {
  await blogsServices(req, res);
};

//get single blog data -------------------------------------------------
export const getBlogController = async (req, res) => {
  await blogServices(req, res);
};

//Post blog data -------------------------------------------------------
export const postBlogController = async (req, res) => {
  await postBlogServices(req, res);
};

//Get sitemap ---------------------------------------------------------
export const getSitemapController = async (req, res) => {
  await getSitemapServices(req, res);
};
