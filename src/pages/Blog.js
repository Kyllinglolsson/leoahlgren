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
