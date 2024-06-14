import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import sanitizeHtml from "sanitize-html";

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

const handleNavigation = (blog) => {
  setId(blog.id);
  localStorage.setItem("blogId", blog.id);

  const extractTitleAndDescription = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const titleElement = doc.querySelector("h1");
    const descriptionElement = doc.querySelector("p");

    const title = titleElement ? titleElement.textContent : "Untitled";
    const description = descriptionElement
      ? descriptionElement.textContent
      : "";

    return { title, description };
  };

  const { title, description } = extractTitleAndDescription(blog.content);

  // Remove all special characters except hyphens from the title for URL
  const urlEndpoint = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

  navigate(`/blog/${urlEndpoint}`);
};

// Example usage:
fetchDynamicRoutes()
  .then((routes) => {
    console.log("Dynamic routes:", routes);
  })
  .catch((error) => {
    console.error("Error fetching dynamic routes:", error);
  });

const generateSitemap = async () => {
  try {
    // Fetch dynamic routes
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

    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
};

// Run the generate sitemap function
generateSitemap().catch((err) => {
  console.error("Error generating sitemap:", err);
});
