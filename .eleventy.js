module.exports = function(eleventyConfig) {

  // Core website assets
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("videos");

  // Blog/content media
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/videos");

  // Blog data and Markdown files
  eleventyConfig.addPassthroughCopy("content/blog/index.json");
  eleventyConfig.addPassthroughCopy("content/blog/*.md");

  // CMS configuration
  eleventyConfig.addPassthroughCopy("admin/config.yml");

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};