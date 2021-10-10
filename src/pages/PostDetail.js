import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ADDCOMMENT } from "../privates";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Comment from "../components/Comment";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { AuthContext, PostsContext } from "../contexts";
import LinearProgress from "@mui/material/LinearProgress";

function PostDetail() {
  let history = useHistory();
  const { postID } = useParams();

  const { setAuth, auth } = useContext(AuthContext);
  const { posts, setPosts } = useContext(PostsContext);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState(null);
  const HandleCommentSubmit = async (postId) => {
    setLoading(true);
    try {
      let response = await ADDCOMMENT(postId, commentText);
      setComments([response.data, ...comments]);
      setLoading(false);
      setCommentText("");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const GETPOST = async () => {
      try {
        let response = await axios.get(`/posts/${postID}`);
        console.log(response);
        setComments(response.data.comments.reverse());
        setPost(response.data);
      } catch (error) {
        if (error.response.status == 404) {
          console.log(error.response);
          alert("post is not found");
          history.push("");
        } else {
          alert(error);
        }
      }
    };
    GETPOST();
  }, []);

  return (
    <div>
      <Header setAuth={setAuth} auth={auth} />

      <div style={{ margin: "10px auto 0  auto", width: "70rem" }}>
        {post == null ? (
          <PostSkeleton />
        ) : (
          <>
            <Post
              posts={posts}
              setPosts={setPosts}
              post={post}
              setAuth={setAuth}
              setPost={setPost}
              auth={auth}
            />
            {auth.user ? (
              <Box
                className="add-comment-field"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={commentText}
                  onInput={(e) => setCommentText(e.target.value)}
                  className="comment-field"
                  label="Add a public comment.."
                  type="text"
                  variant="standard"
                />
                <Box>
                  <Button
                    onClick={() => HandleCommentSubmit(post.id)}
                    sx={{ fontWeight: "bold" }}
                    color="error"
                    variant="contained"
                    disabled={commentText ? null : "disabled"}
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            ) : (
              <p
                style={{
                  textAlign: "left",
                  color: "gray",
                  margin: "8px auto",
                  fontSize: "0.8rem",
                }}
              >
                <a
                  style={{ textDecoration: "none", color: "gray" }}
                  href="/login"
                >
                  {" "}
                  please login to post a comment
                </a>
              </p>
            )}

            {loading ? (
              <Box style={{ display: "flex" }}>
                <CircularProgress
                  style={{ margin: "auto", textAlign: "center" }}
                />
              </Box>
            ) : null}
            <p>{comments?.length} Comments</p>
            {comments.map((comment) => {
              return (
                <Comment setPost={setPost} post={post} comment={comment} />
              );
            })}
          </>
        )}
        {}
      </div>
    </div>
  );
}

export default PostDetail;
