import Post from "./Post";
import axios from "axios";
import PostSkeleton from "./PostSkeleton";

import { useEffect } from "react";
import {useContext} from "react";
import { AuthContext, PostsContext } from "../contexts";


const Posts = () => {
  const { setAuth, auth } = useContext(AuthContext)
  const { posts, setPosts } = useContext(PostsContext)
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
        posts.length == 0 ? (
          <p style={{ color: "gray" }}>
            No posts :) please be the one to make the first post
          </p>
        ) : (
          posts.map((post) => {
            return (
              <Post
                
                auth={auth}
                setAuth={setAuth}
                setPosts={setPosts}
                posts={posts}

                key={post.id}
                post={post}
              />
            );
          })
        )
      ) : (
        <>
          <PostSkeleton />
        </>
      )}

    </div>
  );
};

export default Posts;
