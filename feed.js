import RSS from "rss";

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
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://itboomi.com/blog/${post.title}`, // Use slugified title
      date: post.createdAt.toDate(),
      custom_elements: [
        { "content:encoded": post.content }, // Include full content as HTML
      ],
    });
  });

  return feed.xml({ indent: true });
};
