import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const PostSkeleton = () => {
  return (
    <div className="post not-hover">
      <div style={{position: 'relative', left: '0px'}}className="post-head">
        <span
          style={{ height: "50px", width: "50px" }}
          className="round-image post-user-profileimage animated-bg"
        >
          &nbsp;
        </span>

        <div style={{ top: "27px", width: "100px" }} className="bar">
          {/* <a className="animated-bg" href="/salim/">
            <span style={{ width: "100px",  marginBottom: "5px" }}  className="in-bc">&nbsp;</span>
          </a> */}

          <span style={{marginBottom: "5px" }} className="in-b animated-bg">
            &nbsp;
          </span>
          <span style={{ }} className="in-b animated-bg">
            &nbsp;
          </span>

        </div>
      </div>
      <div className="post-body">
        <p style={{ marginBottom: "10px" }} className="animated-bg animated-bg-text">
          &nbsp;
        </p>
        <p className="animated-bg animated-bg-text">&nbsp;</p>
        <div className="post-footer">
          <ul>
            <li className="in-bc" title="Like">
              <AiOutlineHeart color="#dfe0e1" />
              <span style={{ paddingLeft: "20px" }} className="post-status-count animated-bg">&nbsp;</span>
            </li>

            <li className="in-bc" title="comment">
              <FaRegComment color="#dfe0e1" />
              <span  style={{ paddingLeft: "20px" }} className="post-status-count animated-bg">&nbsp;</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
