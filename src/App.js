import { GETUSER } from "./privates";
import Feed from "./pages/Feed";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import RequestVarification from "./pages/RequestVarification";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { useState, useLayoutEffect, useContext } from "react";
import { AuthContext, PostsContext } from "./contexts";

function App() {
  const [auth, setAuth] = useState(useContext(AuthContext));
  const [posts, setPosts] = useState(useContext(PostsContext));

  useLayoutEffect(() => {
    const CHECKUSER = async () => {
      if (auth.token === null) {
        return;
      } else {
        let response = await GETUSER(auth.token);
        console.log(response);
        setAuth({ ...auth, is_authenticated: true, user: response.data });
      }
    };
    CHECKUSER();
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PostsContext.Provider value={{ posts, setPosts }}>
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
                <SignUp style={{backgroundColor: '#fff'}}/>
              </Route>
              <Route path="/posts/:postID">
                <PostDetail auth={auth} setAuth={setAuth} setPosts={setPosts} />
              </Route>
              <Route path="/:username">
                <Profile auth={auth} setAuth={setAuth} />
              </Route>
            </Switch>
          </Router>
        </PostsContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
