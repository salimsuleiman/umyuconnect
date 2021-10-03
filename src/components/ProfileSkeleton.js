import React from "react";

function ProfileSkeleton() {
  return (
    <>
      <div style={{
                marginTop: "20px",
              }}className="profile">
        <div className="p">
          <span
            style={{ height: "50px", width: "50px" }}
            className="rounded-image dp-skeleton animated-bg"
          >
            &nbsp;
          </span>
          <div style={{
                top: "20px",
              }}className="bar">
            <h2
              style={{
                marginBottom: "20px",
              }}
              className="status animated-bg animated-bg-text"
            ></h2>
            <span
              style={{
                padding: "0px 50px",
              }}
              className="status animated-bg animated-bg-text"
            >
              &nbsp;
            </span>

          </div>
          <div style={{ marginTop: "80px" }} className="profile-bio">
            <p
              style={{ marginBottom: "10px" }}
              className="animated-bg animated-bg-text"
            >
              &nbsp;
            </p>
            <p
              style={{ marginBottom: "10px" }}
              className="animated-bg animated-bg-text"
            >
              &nbsp;
            </p>
            <p
              style={{ marginBottom: "10px" }}
              className="animated-bg animated-bg-text"
            >
              &nbsp;
            </p>
          </div>
        </div>

        <div style={{ marginTop: "240px" }}></div>
      </div>
    </>
  );
}

export default ProfileSkeleton;
