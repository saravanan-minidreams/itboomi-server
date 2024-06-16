import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { fetchBlogPosts } from "./src/Api/Db/getBlogData.js";
import striptags from "striptags";
import cheerio from "cheerio";

// Define your static routes here
const links = [
  {
    url: "/",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 1.0,
  },
  {
    url: "/about",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/contact",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/portfolio",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/services",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/blogs",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/app-development-agency-coimbatore",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/web-development-agency-coimbatore",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/graphics-designing-agency-coimbatore",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
  {
    url: "/digital-marketing-agency-coimbatore",
    lastmod: new Date().toLocaleDateString("en-US"),
    changefreq: "daily",
    priority: 0.7,
  },
];

// Function to fetch dynamic routes (blog posts)
const fetchDynamicRoutes = async () => {
  try {
    const blogPosts = await fetchBlogPosts();
    
    if (!Array.isArray(blogPosts)) {
      throw new Error("fetchBlogPosts did not return an array of blog posts");
    }

    return blogPosts.map((post) => {
      const $ = cheerio.load(post.content);
      const titleFromContent = $("h1").text();

      // Sanitize HTML content
      const sanitizedContent = striptags(post.content);

      const formattedTitle = titleFromContent
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/[^a-zA-Z0-9-]/g, "") // Remove all special characters except hyphens
        .replace(/-{2,}/g, "-") // Remove consecutive hyphens
        .toLowerCase();

      return {
        url: `/blog/${formattedTitle}`,
        lastmod: post.lastmod || new Date().toLocaleDateString("en-US"),
        changefreq: post.changefreq || "daily",
        priority: post.priority || 0.7,
      };
    });
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};

const generateSitemap = async () => {
  try {
    // Fetch dynamic routes since last update
    const dynamicRoutes = await fetchDynamicRoutes();
    // Merge static and dynamic routes
    const allRoutes = [...links, ...dynamicRoutes];

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: "https://itboomi.com" });

    // Convert allRoutes to Readable stream format
    const readableStream = Readable.from(
      allRoutes.map((route) => ({
        ...route,
        lastmod: route.lastmod || new Date().toLocaleDateString("en-US"),
      }))
    );

    // Return a promise that resolves with your XML string
    const xmlString = await streamToPromise(readableStream.pipe(stream)).then(
      (data) => data.toString()
    );

    // Write sitemap to public directory
    const publicPath = path.resolve("./public");
    fs.writeFileSync(path.resolve(publicPath, "sitemap.xml"), xmlString);

    // Update lastUpdate timestamp
    // lastUpdate = new Date();

    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

// Export the generateSitemap function for use in other modules
export default generateSitemap;
