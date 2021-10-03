import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import BugReportIcon from "@mui/icons-material/BugReport";
import Avatar from "@mui/material/Avatar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from '@mui/icons-material/Login';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { INITIALAUTH, BASEURL, LOGOUTUSER } from "../privates";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ auth, setAuth }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogout = async () => {
    setOpen2(true);
    setOpen(true);
    let response = await LOGOUTUSER();
    setAuth(INITIALAUTH);
    setOpen2(false);
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open2}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "#e1465e" }}
        position="fixed"
        open={open}
      >
        {open2 ? (
          <>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </>
        ) : null}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            <a
              href="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "400px",
                // fontStyle: "italic",
              }}
            >
              {" "}
              umyu connet!
            </a>
          </Typography>
          {auth.user ? (
            <div style={{ color: "#626262", marginRight: "100px" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  sx={{ width: 33, height: 33 }}
                  alt={auth.user.first_name}
                  src={BASEURL + auth.user.profile_picture}
                />
              </IconButton>
            </div>
          ) : (
            <div>
              <a href="/signup">Signup</a>
              <a href="/login">Login</a>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <h3>Menu</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {auth.user ? (
          <>
            <List>
              <Link
                href={`/${auth.user?.username}`}
                underline="none"
                color="inherit"
              >
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>

                  <ListItemText primary={"Profile"} />
                </ListItem>
              </Link>
              <Link href={`/setting`} underline="none" color="inherit">
                <ListItem button>
                  <ListItemIcon>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Setting"} />
                </ListItem>
              </Link>
            </List>
          </>
        ) : null}
        <Divider />

        <List>
          <Link href={`/about`} underline="none" color="inherit">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItem>
          </Link>
        </List>
        {auth.user ? (
          <>
            <Link href={`/report`} underline="none" color="inherit">
              <ListItem button>
                <ListItemIcon>
                  <BugReportIcon />
                </ListItemIcon>
                <ListItemText primary={"Report a Bug"} />
              </ListItem>
            </Link>
            <Link
              href={`/requestvarification`}
              underline="none"
              color="inherit"
            >
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Request Varification"} />
              </ListItem>
            </Link>

            <ListItem button onClick={HandleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </>
        ) : (
          <>
            <Link href={`/login`} underline="none" color="inherit">
              <ListItem button>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
            <Link href={`/signup`} underline="none" color="inherit">
              <ListItem button>
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary={"Sign Up"} />
              </ListItem>
            </Link>
          </>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet.
        </Typography> */}
      </Main>
    </Box>
  );
}
