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
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import { BASEURL, POSTLIKE } from "../privates";
import unknown_dp from "../images/unknown_dp.jpeg";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// TimeAgo.addDefaultLocale(en);
axios.defaults.baseURL = BASEURL;

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

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Delete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Report
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default function Post({ post, auth, setAuth, setPosts, posts }) {
  const date = new Date(post.date_created);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const CheckIfLiked = (postID, Allposts) => {
    let result = Allposts?.find((pst) => {
      return pst.id === postID;
    });

    return result == undefined ? false : true;
  };

  const HandlePostLike = async (postID) => {
    if (CheckIfLiked(postID, auth.user.liked_posts) == false) {
      let response = await POSTLIKE(postID);
      // setPosts(posts.map((p) => {
      //   if (p.id === postID) {
      //     return {...p, likes: }
      //   }
      // }))
    }
  };

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
            src={
              post.author.profile_picture === null
                ? unknown_dp
                : `${BASEURL}${post.author.profile_picture}`
            }
            sx={{ width: 56, height: 56 }}
          />
        }
        sx={{ textTransform: "capitalize", fontWeight: "bolder" }}
        action={
          <>
            <CustomizedMenus />
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
