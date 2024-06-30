om du ser på dessa sektioner, först från md.js, sedan på blog.js, så ser du namnen för de korrekta klasserna. Hjälp mig att namge klasserna korrekt i blog.css så att css appliceras korrekt. 


```
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
        <Link to={`/blog/${post.data.slug}`}>
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
```

```
// Blog.js

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Markdown, fetchAndSortBlogPosts } from '../components/md';

import '../styles/blog.css';

const Blog = () => {
  const { type, value } = useParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        const posts = await fetchAndSortBlogPosts();
        setBlogPosts(posts);

        const uniqueTags = new Set();
        posts.forEach(post => {
          post.tags.forEach(tag => uniqueTags.add(tag));
        });
        setTags(Array.from(uniqueTags));

        if (type === 'blog') {
          const post = posts.find(post => post.slug === value);
          if (post) {
            setSelectedPost(post);
          }
        } else if (type === 'tags') {
          const filtered = posts.filter(post => post.tags.includes(value));
          setFilteredPosts(filtered);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    getBlogPosts();
  }, [type, value]);

  if (loading) {
    return <div className="blog">Loading...</div>;
  }

  return (
    <div className="blog">

      <div className="body">
        <div className="Wrapper">

          <div className="navColumn">
            <h2 className="tagsHeader">Taggar</h2>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <Link
                    to={`/tags/${tag}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="datesHeader">Datum</h2>
            <ul className="datesList">
              {blogPosts.map((post, index) => (
                <li key={index}>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="dateItem">
                      <div className="date">
                        {post.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="title">{post.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

          </div> {/* navColumn */}
          
          <div className="blogColumn">
            {type === 'blog' && selectedPost && (
              <Markdown file={selectedPost.file} />
            )}
            {type === 'tags' && filteredPosts.length > 0 && (
              filteredPosts.map((post, index) => (
                <Markdown key={index} file={post.file} />
              ))
            )}
            {type === 'tags' && filteredPosts.length === 0 && (
              <p>No posts found for tag: {value}</p>
            )}
            {!type && !value && blogPosts.map((post, index) => (
              <Markdown key={index} file={post.file} />
            ))}
          </div> {/* blogColumn */}
          
        </div> {/* Wrapper */}
      </div> {/* body */}
    </div>
  );
};

export default Blog;

```

```
/* blog.css */

/* Body layout */
.body {
    display: flex;
    flex-wrap: wrap;
}

/* Blog */
.blog {
    display: flex;
    flex-direction: column;
}

/* Wrapper */
.Wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 10%;
    flex: 1;
    width: 100%;
    height: auto;
}

/* NavColumn */
.navColumn {
        margin-right: 10%;
        margin-left: 2%;
        margin-top: 4%;
        font-size: 14px;
    }

    .navColumn h1 {
        font-size: 14px;
        font-weight: normal;
    }

    .navColumn ul {
        list-style-type: none;
        padding: 0;
    }

    .navColumn ul li {
        margin-bottom: 10px;
    }

    .tag {
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 5px;
        border-radius: 5px;
        background-color: #f6f8fa;
        font-size: 12px;
        cursor: pointer;
    }

    .tagsHeader, .blogPostsHeader {
        font-size: 14px;
        font-weight: 700;
    }

    .tagButton, .postlist, .undoButton {
        cursor: pointer;
    }

    .navColumn ul li a,
    .navColumn ul li button {
        background-color: transparent;
        text-decoration: underline;
        border: none;
        padding: 0;
        font-size: 14px;
}


/* BlogColumn */

.blogColumn {
    padding: 2%;
    max-width: 70%;
    }

    .blogItem {
    margin-bottom: 20px;
    max-width: 70%;
}

/* Markdown CSS */
.blogItem p {
    font-size: 14px;
    text-align: justify;
}

.blogItem a {
    text-decoration: underline;
    color: inherit;
}

.blogItem sup {
    font-size: 8px;
    vertical-align: super;
    line-height: 1;
}


.markdown-body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.6;
    padding: 45px;
    max-width: 100%;
    box-sizing: border-box;
    color: #333;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3 {
    margin-top: 1em;
    margin-bottom: 16px;
    font-weight: bold;
}

.markdown-body h1 {
    font-size: 36px;
}

.markdown-body h2 {
    font-size: 30px;
}

.markdown-body h3 {
    font-size: 24px;
}

.markdown-body pre {
    background-color: #f6f8fa;
    padding: 16px;
    overflow: auto;
    border-radius: 3px;
    margin: 1em 0;
}

.markdown-body code {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    background-color: #f6f8fa;
}

.markdown-body blockquote {
    margin: 0;
    padding-left: 1em;
    border-left: 4px solid #ddd;
    color: #666;
    font-style: italic;
}

.markdown-body ul, .markdown-body ol {
    margin: 1em 0;
    padding: 0 0 0 2em;
}

.markdown-body ul {
    list-style-type: disc;
}

.markdown-body ol {
    list-style-type: decimal;
}

.markdown-body img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Footnotes */
.markdown-body .footnotes {
    font-size: 0.85em;
    border-top: 1px solid #ddd;
    margin-top: 1em;
    padding-top: 1em;
}

.markdown-body .footnotes ol {
    padding-left: 1em;
}

.markdown-body .footnotes li {
    margin-bottom: 0.5em; 
}

/* Task Lists */
.markdown-body input[type="checkbox"] {
    margin: 0 0.2em 0.25em -1.6em;
    vertical-align: middle;
}

/* Tables */
.markdown-body table {
    width: 100%;
    border-collapse: collapse;
}

.markdown-body table th, .markdown-body table td {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
}

.markdown-body table th {
    background-color: #f6f8fa;
    font-weight: bold;
}

/* Emoji */
.markdown-body .emoji {
    width: 1em;
    height: 1em;
    vertical-align: -0.1em;
}

/* metadata */
.metadata {
    margin-top: 5px; /* Lägg till marginal ovanför metadata */
    font-style: italic;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #666;
    font-weight: 800;
}

.metadata {
    margin: 10px;
}

.datesHeader {
    font-size: 20px;
    font-weight: 700;
}

.tagsHeader {
    font-size: 20px;
    font-weight: 700;
}

/* Media queries */
@media (max-width: 750px) {
    .body {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        min-height: 100vh;
    }

    .Wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 10%;
        flex: 1;
        width: 100%;
    }

    .navColumn {
        margin: 5%;
        margin-top: 20%;
        font-size: 8px;
        width: 90%;
        max-width: 100%;
    }
    
    .navColumn h1 {
        font-size: 8px;
        font-weight: normal;
    }
    
    .navColumn ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    
    .tagsHeader, .blogPostsHeader {
        font-size: 8px;
        font-weight: 700;
        margin-right: 10px;
    }
    
    .navColumn ul li {
        margin: 0;
        margin-left: 2px;
        margin-right: 2px;
        height: fit-content;
        max-height: fit-content;
    }
    
    .navColumn ul li a,
    .navColumn ul li button {
        border: none;
        padding: 0;
        font-size: 9px;
    }

    .blogColumn {
        order: 2;
        max-width: 90%;
        padding: 0;
        line-height: 1.5;
    }

    .blogItem {
        padding: 5%;
        justify-content: center;
        max-width: 90%;
    }

    .blogItem p {
        font-size: 12px;
        word-wrap: break-word;
        display: block;
        max-width: 90%;
        margin-top: 0;
        margin-bottom: 5px;
    }

    .blogItem a {
        font-size: 12px;
    }

    .blogItem img {
        justify-content: center;
    }

    .h1 {
        font-size: 24px;
    }

    h2 {
        font-size: 20px;
    }

    h3 {
        font-size: 18px;
    }

    h4 {
        font-size: 16px;
    }

    .metadata {
        margin-bottom: 10px;
        font-style: italic;
      }
      
      .metadata .readingTime {
        font-weight: bold;
        margin-right: 10px;
      }
      
      .metadata .author {
        color: #666;
      }
    
      .date {
        font-size: 11px;
        color: #999;
      }
      .datesHeader {
        font-size: 11px;
      }
    
      .tagsHeader {
        font-size: 11px;
    }
}

```