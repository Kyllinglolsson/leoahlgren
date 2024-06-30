// md.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItHighlightjs from 'markdown-it-highlightjs';
import markdownItTaskLists from 'markdown-it-task-lists';
import markdownItToc from 'markdown-it-toc-done-right';
import markdownItMultimdTable from 'markdown-it-multimd-table';
import markdownItPlusImage from 'markdown-it-plus-image';
import markdownItMark from 'markdown-it-mark';
import markdownItIns from 'markdown-it-ins';
import markdownItContainer from 'markdown-it-container';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import markdownItAbbr from 'markdown-it-abbr';

/* MarkdownIt-konfiguration */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  quotes: '“”‘’',
  highlight: function (/*str, lang*/) { return ''; }
})
.use(markdownItContainer, 'container', {
  validate: params => params.trim() === 'container',
  render: (tokens, idx) => {
    const token = tokens[idx];
    const content = token.content;
    return `<div class="container">${content}</div>`;
  }
})
.use(markdownItFootnote)
.use(markdownItHighlightjs)
.use(emoji)
.use(markdownItTaskLists)
.use(markdownItToc)
.use(markdownItMultimdTable)
.use(markdownItPlusImage)
.use(markdownItMark)
.use(markdownItIns)
.use(markdownItSub)
.use(markdownItSup)
.use(markdownItAbbr);

/* Fetch and sort blog posts */
const fetchMarkdownFile = async (fileUrl) => {
  console.log('Fetching markdown file from:', fileUrl);
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileUrl}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching markdown file:', error);
    throw error;
  }
};


export const fetchAndSortBlogPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/blogPosts');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    let posts = await response.json();

    // Hämta metadata och sortera inläggen efter datum
    posts = await Promise.all(posts.map(async post => {
      const markdownText = await fetch(post.path).then(res => res.text());
      const { data } = matter(markdownText);
      
      // Extrahera slug från filnamnet
      const [, ...slugParts] = post.file.split('_');
      const slug = slugParts.join('_').replace('.md', '');
      
      return { 
        ...post, 
        date: new Date(data.date), 
        tags: data.tags || [], 
        author: data.author,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        slug: slug,
        status: data.status,
        readingTime: data.readingTime,
        fileName: post.file // Inkludera filnamnet i inläggsdata
      };
    }));

    // Sortera i fallande ordning efter datum
    posts.sort((a, b) => b.date - a.date);

    return posts;
  } catch (error) {
    console.error('Error fetching and sorting blog posts:', error);
    throw error;
  }
};

const Markdown = ({ file }) => {
  const [post, setPost] = useState({ data: {}, content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const markdownText = await fetchMarkdownFile(`/blog/${file}`);
        const { data, content } = matter(markdownText);
        setPost({ data, content });
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };
    fetchPost();
  }, [file]);

  if (!post.data.slug) {
    return null; // or some loading indicator while data is being fetched
  }

  const html = md.render(post.content);

  return (
    <div className="blogItem">
      <h1>
        <Link to={`/blog/${post.data.slug}`} className="titleLink">
          {post.data.title}
        </Link>
      </h1>
      <div className="metadata">
        <div className="readingTime">{post.data.readingTime}</div>
        <div className="author">{post.data.author}</div>
        <div> {new Date(post.data.date).toLocaleDateString()}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {post.data.excerpt && <p className="excerpt">{post.data.excerpt}</p>}
      {post.data.featuredImage && <img src={post.data.featuredImage} alt={post.data.title} />}
      <div className="tags">
        {(post.data.tags || []).map((tag, index) => (
          <Link key={index} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="tag">{tag}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Markdown };