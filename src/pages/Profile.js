import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { GETUSERPROFILE } from "../privates";
import ProfileSkeleton from "../components/ProfileSkeleton";
import Post from "../components/Post";
import { BASEURL } from "../privates";
import unknown_dp from "../images/unknown_dp.jpeg";
import { Redirect, useHistory } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Button from "@mui/material/Button";

const Profile = ({ auth, setAuth }) => {
  let history = useHistory();

  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [found, setFound] = useState(true);
  // Stranger: follow me in tiktok alee.ram

  const get_likes = () => {
    let result = 0;
    user.posts.forEach((post) => [(result += post.likes.length)]);
    return result;
  };
  useLayoutEffect(() => {
    const get_user_profile = async () => {
      try {
        const response = await GETUSERPROFILE(username);
        setUser(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        setFound(false);
        setUser({});
      }
    };

    get_user_profile();
  }, []);

  return (
    <>
      <Header auth={auth} setAuth={setAuth} />
      {user == null ? (
        <ProfileSkeleton />
      ) : (
        <div className="profile">
          {found == false ? (
            <Redirect to="/" />
          ) : (
            <div className="p" style={{backgroundColor: '#FAFAFA'}}>
              <img
                src={
                  user.profile_picture === null
                    ? unknown_dp
                    : `${BASEURL}${user.profile_picture}`
                }
                alt={`..dp of ${user.first_name}`}
                className="rounded-image dp"
              />
              <div className="bar">
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <span>@{user.username}</span>
                {auth.user != null && auth.user.id == user.id ? (
                  <Button
                    variant="outlined"
                    style={{
                      width: "100px",
                      position: "relative",
                      left: "150px",
                      top: "-30px",
                    }}
                    // className="btn"
                  >
                    <SettingsOutlinedIcon />
                  </Button>
                ) : null}

                <div className="profile-status">
                  <h4 className="in-bc">Posts</h4>
                  <h4 className="in-bc">Likes</h4>

                  <div className="statuses">
                    <span className="status">{user.posts.length}</span>
                    <span className="status">{get_likes()}</span>
                  </div>
                </div>
              </div>
              <div className="profile-bio">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laboriosam quidem nemo, omnis cupiditate dicta deleniti totam,
                  ratione, quibusdam beatae molestiae ut. Ratione recusandae
                  officia iste quos vel? Repudiandae, eaque blanditiis.
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: "290px"}}>
            {found
              ? user.posts.map((post) => {
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
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
