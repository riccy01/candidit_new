const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'content', 'blog');
const outputFile = path.join(blogDir, 'posts.json');

const files = fs.readdirSync(blogDir)
  .filter(file => file.endsWith('.md'));

const posts = files.map(filename => {
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

  // Extract front matter
  const match = content.match(/---\s*([\s\S]*?)\s*---/);
  let metadata = {};
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if(key) metadata[key.trim()] = rest.join(':').trim();
    });
  }

  return {
    filename,
    title: metadata.title || 'Untitled',
    date: metadata.date || ''
  };
});

// Write posts.json
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Generated ${outputFile} with ${posts.length} posts.`);