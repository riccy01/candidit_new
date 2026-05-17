const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "../content/blog");

const files = fs.readdirSync(blogDir)
  .filter(f => f.endsWith(".md"));

const posts = files.map(file => {
  const content = fs.readFileSync(path.join(blogDir, file), "utf8");

  const titleMatch = content.match(/title:\s*(.*)/);
  const dateMatch = content.match(/date:\s*(.*)/);

  return {
    filename: file,
    slug: file.replace(".md", ""),
    title: titleMatch ? titleMatch[1] : "Untitled",
    date: dateMatch ? dateMatch[1] : ""
  };
});

fs.writeFileSync(
  path.join(blogDir, "index.json"),
  JSON.stringify(posts, null, 2)
);

console.log("index.json generated");