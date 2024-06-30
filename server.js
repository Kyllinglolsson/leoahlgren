const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set the Permissions-Policy header
app.use((req, res, next) => {
  res.header('Permissions-Policy', 'attribution-reporting=(*);');
  next();
});

// API-endpoint för att hämta blogginlägg
app.get('/api/blogPosts', (req, res) => {
  const blogDir = path.join(__dirname, 'public/blog');
  fs.readdir(blogDir, (err, files) => {
    if (err) {
      console.error('Failed to read blog directory:', err);
      return res.status(500).json({ error: 'Failed to load blog posts' });
    }

    const posts = files
     .filter(file => file.endsWith('.md'))
     .map(file => ({
        file,
        path: `/blog/${file}`
      }));

    res.json(posts);
  });
});

// Starta servern på port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});