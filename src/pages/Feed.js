import Posts from "../components/Posts";
import Header from "../components/Header";
import PostCreateArea from "../components/PostCreateArea";
import Menu from "@mui/material/Menu";
import { useContext } from "react";
import { AuthContext, PostsContext } from "../contexts";

const Feed = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const { posts, setPosts } = useContext(PostsContext);

  return (
    <>
      <Header auth={auth} setAuth={setAuth} />

      <div className="feed-container">
        {auth.is_authenticated ? (
          <PostCreateArea auth={auth} setPosts={setPosts} posts={posts} />
        ) : (
          <p
            style={{
              textAlign: "left",
              color: "gray",
              margin: "5px auto",
              fontSize: "0.8rem",
            }}
          >
            <a style={{ textDecoration: "none", color: "gray" }} href="/login">
              {" "}
              please login to make a post
            </a>
          </p>
        )}

        <div className="feed-posts">
          <Posts
            auth={auth}
            setAuth={setAuth}
            posts={posts}
            setPosts={setPosts}
          />
        </div>
      </div>
    </>
  );
};

export default Feed;
