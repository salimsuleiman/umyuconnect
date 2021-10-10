import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";

import Box from '@mui/material/Box';




function Media(props) {
  return (
    <Card sx={{  ml: -7, border: 'none', borderShadow: 'none', boxShadow: 'none' }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={60}
            height={60}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={20}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={20} width="40%" />}
      />
       <CardContent>
       <Skeleton />
      <Skeleton animation="wave" />
      </CardContent>
    </Card>
  );
}

export default function Facebook() {
  return (
    <div>
      <Media />
     
    </div>
  );
}
