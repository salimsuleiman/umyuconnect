import Login from "../components/Login";
import umyukLogo from "../images/download.jpeg";
import { useEffect } from "react";
import {useContext} from "react";
import { AuthContext, PostsContext } from "../contexts";

const Home = () => {
  const { setAuth, auth } = useContext(AuthContext)
  const { posts, setPosts } = useContext(PostsContext)
  return (
    <>
      {/* <div className="split brand">
        <img src={umyukLogo} />
        <h2>A platform to interact with freinds and family!</h2>
      </div> */}

      <Login auth={auth} setAuth={setAuth} />
    </>
  );
};

export default Home;
