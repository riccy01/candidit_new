const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "../content/blog");

const files = fs.readdirSync(blogDir)
  .filter(f => f.endsWith(".md"));

const posts = files.map(file => {
  const content = fs.readFileSync(
    path.join(blogDir, file),
    "utf8"
  );

  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const dateMatch = content.match(/^date:\s*(.+)$/m);

  return {
    filename: file,
    slug: file.replace(/\.md$/, ""),
    title: titleMatch ? titleMatch[1].trim() : "Untitled",
    date: dateMatch ? dateMatch[1].trim() : ""
  };
});

// Sort newest posts first
posts.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

fs.writeFileSync(
  path.join(blogDir, "index.json"),
  JSON.stringify(posts, null, 2)
);

console.log("index.json generated");