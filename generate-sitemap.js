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

const fetchDynamicRoutes = async () => {
  try {
    const response = await fetch(
      "https://udaney-server.onrender.com/all/blogs"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blogs = await response.json();

    // Function to sanitize HTML content and extract first h1 content
    const extractFirstH1 = (html) => {
      const dom = new JSDOM(html);
      const firstH1Element = dom.window.document.querySelector("h1");

      if (firstH1Element) {
        // Use sanitize-html to strip all HTML tags
        let h1Content = sanitizeHtml(firstH1Element.innerHTML, {
          allowedTags: [], // No tags allowed, just strip everything
          allowedAttributes: {}, // No attributes allowed
        });

        // Remove unwanted characters and format
        h1Content = h1Content
          .trim()
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");

        return h1Content;
      }

      return null; // Return null if no h1 tag is found
    };

    // Map blogs to sitemap format
    return blogs.map((blog) => {
      const htmlContent = blog.content;
      const firstH1Text = extractFirstH1(htmlContent);

      // Get the date in YYYY-MM-DD format
      const date = new Date(blog.createdAt.seconds * 1000);
      const lastmod = date.toLocaleDateString("en-US");

      return {
        url: firstH1Text ? `/blog/${firstH1Text}` : `/blog/${blog.id}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: lastmod,
      };
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
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
