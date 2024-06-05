import RSS from "rss";
import striptags from "striptags";

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
    const contentWithoutTags = striptags(post.content); // Remove HTML tags
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://itboomi.com/blog/${post.title}`, // Use slugified title
      date: post.createdAt.toDate(),
      custom_elements: [
        { contentWithoutTags }, // Include content without HTML tags
      ],
    });
  });

  return feed.xml({ indent: true });
};
