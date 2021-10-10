import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ReactTimeAgo from "react-time-ago";

import { BASEURL } from "../privates";
import { FaCheckCircle } from "react-icons/fa";




function Comment({ comment }) {
  const date = new Date(comment.date_created);
  return (
    <div className="comment" style={{ padding: 12, boxShadow: "none", marginBottom: '1px' }}>
      <Paper style={{ padding: "35px 20px", marginBottom: '1px' , boxShadow: "none" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              alt={comment.author.first_name}
              src={`${BASEURL}${comment.author.profile_picture}`}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <>
              <a href={`/${comment.author.username}`}>
                {comment.author.first_name}
              </a>
              <FaCheckCircle
                title="confirmed this is the authentic profile for this public figure."
                style={{
                  fontSize: "15px",
                  color: "#4786FB",
                  marginLeft: "10px",
                  position: "relative",
                  top: "1px",
                }}
              />
            </>
            <p style={{ textAlign: "left" }}>{comment.text}</p>
            <p style={{ textAlign: "left", color: "gray", fontSize: '0.9rem' }}>
              posted{" "}
              {
                <ReactTimeAgo
                  style={{ textTransform: "none" }}
                  date={date}
                  locale="en-US"
                />
              }
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Comment;
