import { INITIALAUTH, LOGINUSER, GETUSER, BASEURL } from "./privates";
import Feed from "./pages/Feed";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import RequestVarification from "./pages/RequestVarification";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/SignUp";
import { useState, useEffect } from "react";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";
import "./styles/profile.css";
import "./styles/style.css";
import "./styles/feed.css";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);
axios.defaults.baseURL = BASEURL;

function App() {
  console.log(">>>>>");
  const [auth, setAuth] = useState(INITIALAUTH);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const CHECKUSER = async () => {
      if (auth.token === null) {
        return 
  
      } else {
        let response = await GETUSER(auth.token);
        console.log(response)
        setAuth({ ...auth, is_authenticated: true, user: response.data });
      }
    };
    CHECKUSER();
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="feed-container">
              <Feed
                auth={auth}
                setAuth={setAuth}
                setPosts={setPosts}
                posts={posts}
              />
            </div>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/requestvarification">
            <RequestVarification />
          </Route>
          <Route path="/login">
            <Home auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/posts/:postID">
            <PostDetail auth={auth} setAuth={setAuth} setPosts={setPosts} />
          </Route>
          <Route path="/:username">
            <Profile auth={auth} setAuth={setAuth} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
