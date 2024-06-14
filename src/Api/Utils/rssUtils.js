import RSS from "rss";
import striptags from "striptags";
import cheerio from "cheerio";

export const generateRSSFeed = (blogPosts) => {
  const feed = new RSS({
    title: "My Blog",
    description: "This is my blog where I write about various topics.",
    feed_url: "https://itboomi.com/feed",
    site_url: "https://itboomi.com",
    language: "en",
    pubDate: new Date(),
    ttl: "60",
  });

  blogPosts.forEach((post) => {
    console.log(post.title);
    const $ = cheerio.load(post.content);
    const titleFromContent = $("h1").text();

    const formattedTitle = titleFromContent.replace(/%20/g, "-");
    const contentWithoutTags = striptags(post.content);

    feed.item({
      title: titleFromContent,
      description: post.description,
      url: `https://itboomi.com/blog/${formattedTitle}`,
      date: post.createdAt.toDate(),
      custom_elements: [{ contentWithoutTags }],
    });
  });

  return feed.xml({ indent: true });
};
