// rss feed error message ----------------------------------
export const rssErrorResponse = (error) => {
  return {
    status: 500,
    success: false,
    message: `Error generating RSS feed: ${error.message}`,
  };
};
