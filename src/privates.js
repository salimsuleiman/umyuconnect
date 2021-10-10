import axios from "axios";

export const BASEURL = "http://localhost:8000";

export const INITIALAUTH = {
  is_authenticated: false,
  user: null,
  token: localStorage.getItem("Token"),
};

const HEADERS = (token) => {
  return {
    Authorization: `Token ${localStorage.getItem("Token")}`,
  };
};

export const DELETEPOST = async (postID) => {
  return await axios.delete(`/posts/delete/${postID}/`, {
    headers: HEADERS(""),
  });
};

export const POSTLIKE = async (postID) => {
  return await axios.post(
    `/posts/like/${postID}/`,
    {},
    { headers: HEADERS("") }
  );
};

export const POSTUPDATE = async (postID, editedtext) => {
  console.log(editedtext);
  return await axios.put(
    `/posts/update/${postID}/`,
    { text: editedtext },
    { headers: HEADERS("") }
  );
};

export const ADDCOMMENT = async (postID, text) => {
  return await axios.post(
    `/posts/comments/add/${postID}/`,
    { text: text },
    { headers: HEADERS("") }
  );
};

export const GETUSER = async (token) => {
  const response = await axios.post(
    "/accounts/user/",
    {},
    { headers: HEADERS(token) }
  );
  return response;
};

export const LOGINUSER = async (username, password) => {
  const response = await axios.post("/accounts/login/", {
    username: username,
    password: password,
  });

  localStorage.setItem("Token", response.data.token);
  const user = await GETUSER(response.data.token);
  return { user: user.data, token: response.data.token };
};

export const GETUSERPROFILE = async (username) => {
  const response = await axios.get(`/accounts/${username}`);
  return response;
};
export const LOGOUTUSER = async (token) => {
  const response = await axios.post(
    "/accounts/logout/",
    {},
    { headers: HEADERS("") }
  );
  localStorage.removeItem("Token");
  return response;
};
