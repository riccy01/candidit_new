const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "content/blog");
const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));

function titleFromFilename(filename) {
  return filename
    .replace(".md", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function stripFrontmatter(content) {
  return content.replace(/---[\s\S]*?---/, "").trim();
}

function generateExcerpt(content) {
  return stripFrontmatter(content)
    .replace(/^#.*$/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

const posts = files.map(file => {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");

  const cleaned = stripFrontmatter(raw);

  const slug = file.replace(".md", "");

  return {
    filename: file,
    slug: slug,
    title: titleFromFilename(file),
    excerpt: generateExcerpt(raw),   // ✅ CLEANED
    date: new Date().toISOString().split("T")[0]
  };
});

fs.writeFileSync(
  path.join(postsDir, "posts.json"),
  JSON.stringify(posts, null, 2)
);

console.log("posts.json regenerated cleanly");