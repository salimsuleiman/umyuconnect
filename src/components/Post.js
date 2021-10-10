import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaRegComment } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import FormDialog from "./EditPostDialog";
import ReactTimeAgo from "react-time-ago";
import { BASEURL, POSTLIKE, DELETEPOST, POSTUPDATE } from "../privates";
import unknown_dp from "../images/unknown_dp.jpeg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useHistory, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext, PostsContext } from "../contexts";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

// TimeAgo.addDefaultLocale(en);
// axios.defaults.baseURL = BASEURL;

export default function Post({ post, setPost, setPosts, posts }) {
  const date = new Date(post.date_created);
  let history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setAuth, auth } = useContext(AuthContext);

  const open = Boolean(anchorEl);

  const CheckIfLiked = (postID, Allposts) => {
    let result = Allposts?.find((pst) => {
      return pst.id === postID;
    });

    return result == undefined ? false : true;
  };

  const HandlePostLike = async (postID) => {
    if (!auth.is_authenticated) {
      return
    }
    try {
      let response = await POSTLIKE(postID);
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          liked_posts: [
            ...auth.user.liked_posts,
            { id: post.id, text: post, date_created: post.date_created },
          ],
        },
      });
      setPosts(
        posts?.map((post) => {
          if (post.id === postID) {
            return {
              ...post,
              likes: [
                ...post.likes,
                {
                  id: auth.user.id,
                  username: auth.user.username,
                  profile_picture: auth.user?.profile_picture,
                  varified: auth.user.varified,
                  first_name: auth.user.first_name,
                  last_name: auth.user.last_name,
                },
              ],
            };
          }
          return post;
        })
      );
    } catch (error) {
      // alert(error)
      if (error.response.status === 300) {
        setAuth({
          ...auth,
          user: {
            ...auth.user,
            liked_posts: auth.user.liked_posts.filter(
              (post) => post.id !== postID
            ),
          },
        });
        setPosts(
          posts?.map((post) => {
            if (post.id === postID) {
              return {
                ...post,
                likes: post.likes.filter((user) => user.id !== auth?.user.id),
              };
            }
            return post;
          })
        );
      }
    }
  };

  function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dialog, setDialog] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const HandlePostDelete = async (postID) => {
      handleClose();
      setDialog(false);
      setShow(true);
      let response = await DELETEPOST(postID);
      setShow(false);
      if (setPosts === undefined) {
        history.push("");
        return;
      }
      setPosts(posts.filter((post) => post.id !== postID));
    };

    const HandlePostEdit = async (postID, edittext) => {
      setDialog(false);
      handleClose();
      setShow(true);
      let response = await POSTUPDATE(postID, edittext);

      setShow(false);
      if (setPost !== undefined) {
        setPost({ ...post, text: edittext });
        return;
      }
      setPosts(
        posts?.map((post) => {
          if (post.id == postID) {
            return { ...post, text: edittext };
          }
          return post;
        })
      );
    };

    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={show}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <FormDialog
          props={{
            dialog: dialog,
            HandlePostEdit: HandlePostEdit,
            postID: post.id,
            setDialog: setDialog,
            text: post.text,
          }}
        />
        <IconButton onClick={handleClick} aria-label="settings">
          <MoreVertIcon />
        </IconButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {auth.user?.id == post.author.id ? (
            <>
              <MenuItem onClick={() => setDialog(true)} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => HandlePostDelete(post.id)}
                disableRipple
                style={{ color: "red" }}
              >
                <FileCopyIcon style={{ color: "red" }} />
                Delete
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
            </>
          ) : null}

          <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            Report
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }

  console.log(post.author);
  return (
    <Card
      className="post"
      sx={{
        // maxWidth: 640,
        mb: 2,
        // color: "#fff",
        // backgroundColor: "#303030",
        border: "1px solid #eff1f1",
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            className="round-image post-user-profileimage"
            alt="Remy Sharp"
            src={BASEURL + post.author.profile_picture}
            alt={post.author.first_name}
            sx={{ width: 56, height: 56 }}
          />
        }
        sx={{ textTransform: "capitalize", fontWeight: "bolder" }}
        action={
          <>
            <CustomizedMenus post={post} />
          </>
        }
        title={
          <div className="comment">
            <a href={`/${post.author.username}`}>
              {post.author.first_name} {post.author.last_name}
            </a>

            {post.author.varified ? (
              <FaCheckCircle
                title="confirmed this is the authentic profile for this public figure."
                style={{
                  color: "#4786FB",
                  marginLeft: "10px",
                  position: "relative",
                  top: "2px",
                }}
              />
            ) : null}
          </div>
        }
        subheader={
          <ReactTimeAgo
            style={{ textTransform: "none" }}
            date={date}
            locale="en-US"
          />
        }
      />

      <CardContent>
        <a
          style={{
            textDecoration: "none",
            color: "black",
            fontStyle: "inherit",
          }}
          href={`/posts/${post.id}`}
        >
          <Typography
            sx={{
              mt: -1,
              color: "#3C3F43",
              fontSize: "17px",
            }}
            gutterBottom
            variant="body2"
            color="text.secondary"
          >
            {post.text}
          </Typography>
        </a>
      </CardContent>
      <CardActions sx={{}} disableSpacing>
        <IconButton
          sx={{
            mr: 3,
          }}
          aria-label="add to favorites"
        >
          {CheckIfLiked(post.id, auth.user?.liked_posts) ? (
            <FavoriteIcon
              onClick={() => HandlePostLike(post.id)}
              sx={{
                color: "red",
              }}
            />
          ) : (
            <FavoriteBorderIcon onClick={() => HandlePostLike(post.id)} />
          )}
        </IconButton>
        <Typography
          sx={{
            position: "relative",
            left: -25,
            color: "#3C3F43",
            fontSize: "17px",
          }}
          variant="body2"
          color="text.secondary"
        >
          {post.likes.length}
        </Typography>

        <IconButton aria-label="share">
          <FaRegComment />
        </IconButton>
        <Typography
          sx={{
            color: "#3C3F43",
            fontSize: "17px",
          }}
          variant="body2"
          color="text.secondary"
        >
          {post.comments.length}
        </Typography>
      </CardActions>
    </Card>
  );
}
// -------------------------------

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
