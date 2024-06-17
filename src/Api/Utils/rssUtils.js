import RSS from "rss";
import striptags from "striptags";
import cheerio from "cheerio";

export const generateRSSFeed = (blogPosts) => {
  const feed = new RSS({
    title: "My Blog",
    description: "This is my blog where I write about various topics.",
    feed_url: "https://itboomi-server.onrender.com/feed",
    site_url: "https://itboomi.com",
    language: "en",
    pubDate: new Date(),
    ttl: "60",
  });

  blogPosts.forEach((post) => {
    const $ = cheerio.load(post.content);
    const titleFromContent = $("h1").text();

    // Sanitize HTML content
    const sanitizedContent = striptags(post.content);

    const formattedTitle = titleFromContent
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^a-zA-Z0-9-]/g, "") // Remove all special characters except hyphens
      .replace(/-{2,}/g, "-") // Remove consecutive hyphens
      .toLowerCase();

    feed.item({
      title: titleFromContent,
      description: post.description,
      url: `https://itboomi.com/blog/${formattedTitle}${post.id}`,
      date: post.createdAt.toDate(),
      custom_elements: [{ "content:encoded": { _cdata: sanitizedContent } }],
    });
  });

  return feed.xml({ indent: true });
};
