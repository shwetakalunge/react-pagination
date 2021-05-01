import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Posts from "./components/post";
import Pagination from "./components/pagination";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [error, setError] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Shweta Kalunge Blog</h1>

      {error ? (
        <h1>Something Went Wrong</h1>
      ) : (
        <div>
          <Posts posts={currentPosts} loading={loading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
}
