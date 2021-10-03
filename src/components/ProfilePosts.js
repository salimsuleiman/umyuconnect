import React from "react";
import Post from "./Post";
import { useEffect } from "react";
import axios from "axios";
import PostSkeleton from "./PostSkeleton";

// axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "http://localhost:8000";

const Posts = ({ posts, setPosts }) => {
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`/posts/feed/`);
        setPosts(response.data);
      } catch (error) {
        alert(`<<Error Code: ${error}`);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      {posts !== null ? (
        posts.map((post) => {
          return <Post isSkeleton={false} key={post.id} post={post} />;
        })
      ) : (
        <>
          <PostSkeleton /> <PostSkeleton /> <PostSkeleton />
        </>
      )}
    </div>
  );
};

export default Posts;
