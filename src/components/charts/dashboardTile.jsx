import React from "react";

const DashBoardTile = ({ label }) => {
  return (
    <div
      className="m-3 rounded border"
      style={{
        width: 250,
        aspectRatio: 3,
      }}
    >
      <h3 className="mx-3">{label}</h3>
    </div>
  );
};

export default DashBoardTile;
