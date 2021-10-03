import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { BASEURL, ADDCOMMENT } from "../privates";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Comment from "../components/Comment";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// axios.defaults.baseURL = BASEURL;

function PostDetail({ auth, setPosts, setAuth }) {
  const [commentText, setCommentText] = useState("");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const HandleCommentSubmit = async (postId) => {
    setLoading(true);
    try {
      let response = await ADDCOMMENT(postId, commentText);
      setComments([response.data, ...comments]);
      setLoading(false);
      setCommentText('')
    } catch (error) {
      alert(error);
    }
  };

  let history = useHistory();
  const { postID } = useParams();

  useLayoutEffect(() => {
    const GETPOST = async () => {
      let response = await axios.get(`/posts/${postID}`);
      setComments(response.data.comments.reverse());
      setPost(response.data);
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
              post={post}
              setAuth={setAuth}
              setPosts={setPosts}
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
              
               <p style={{ textAlign: "left", color: "gray", margin: '8px auto', fontSize: "0.8rem" }}>
               <a style={{ textDecoration: 'none', color: "gray", }} href='/login'>  please login to post a comment</a>
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
