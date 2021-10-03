import Login from "../components/Login";
import umyukLogo from "../images/download.jpeg";


const Home = ({auth, setAuth}) => {
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
