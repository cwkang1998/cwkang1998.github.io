const config = {
  siteTitle: "Chen Wen Kang", // Site title.
  siteTitleShort: "Chen Wen Kang", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "cwkang1998", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://cwkang1998.github.io", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Personal portfolio site and blog.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Chen Wen Kang", // Username to display in the author segment.
  userEmail: "wenkangchen4@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "ChenWenKang1", // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: "cwkang1998", // Optionally renders "Follow Me" in the Bio segment.
  userLocation: "Kuala Lumpur, Malaysia", // User location to display in the author segment.
  userAvatar: "https://i.ibb.co/WPz9CNk/avatar.jpg", // User avatar to display in the author segment.
  userDescription: "", // User description to display in the author segment.
  copyright: "Copyright © 2021. All rights reserved.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c2d9ff", // Used for setting manifest and progress theme colors.
  backgroundColor: "#082554" // Used for setting manifest background color.
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
