import React from "react";
import Badge from "../icons/varified-badge.svg";

function VariFiedBadge() {
  return (
    <span>
      <img
        title="confirmed this is the authentic profile for this public figure."
        width="14"
        height="14"
        className="varified-badge"
        src={Badge}
        alt=""
      />
    </span>
  );
}

export default VariFiedBadge;
