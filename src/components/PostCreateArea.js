import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../privates";
import unknown_dp from "../images/unknown_dp.jpeg";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

axios.defaults.baseURL = BASEURL;

const PostCreateArea = ({ auth, setPosts, posts }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  function OnInput(e) {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  const HandleSubmit = (element) => {
    element.preventDefault();
    if (text.trim() == "") {
      return;
    }
    setLoading(true);
    const CreatePost = async () => {
      const response = await axios.post(
        `/posts/create/`,
        { text: text },
        {
          headers: {
            Authorization: `Token ${auth.token}`,
          },
        }
      );
      setLoading(false);
      setPosts([response.data, ...posts]);
    };
    CreatePost();
    setText("");
  };

  return (
    <div className="tweetBox">
      <form onSubmit={HandleSubmit}>
        <div className="tweetBox_input">
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={BASEURL + auth.user?.profile_picture}
            alt={auth.user?.first_name}
          />
          <textarea
            onChange={(e) => OnInput(e)}
            value={text}
            placeholder="What's happening?"
            type="text"
          ></textarea>
        </div>
        <hr></hr>
        {/* <input
          // value={tweetImage}
          // onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox_imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        /> */}

        <button
          disabled={text == "" ? "disabled" : ""}
          style={{ backgroundColor: text == "" ? "#999" : "#333" }}
          type="submit"
          className="tweetBox_tweetButton"
        >
          Post
        </button>
      </form>
      {loading ? (
        <div style={{ textAlign: 'center', margin: "auto" }}>
          <CircularProgress />
        </div>
      ) : null}
    </div>
  );
};

export default PostCreateArea;
