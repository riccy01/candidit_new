module.exports = function(eleventyConfig) {

  // Copy static folders directly to _site
  eleventyConfig.addPassthroughCopy("images");   // your images
  eleventyConfig.addPassthroughCopy("videos");   // optional videos folder

  // You can add other passthrough files if needed
  // eleventyConfig.addPassthroughCopy("css");
  // eleventyConfig.addPassthroughCopy("js");

  return {
    dir: {
      input: ".",       // source folder is candidit_new root
      output: "_site",  // generated site goes here
    },
    // Enable HTML output pretty formatting (optional)
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};