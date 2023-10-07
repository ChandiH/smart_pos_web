import React from "react";
import CountUp from "react-countup";
import PropTypes from "prop-types";

const DashBoardTile = ({ label, value, icon, prefix,decimals }) => {
  return (
    <div
      className="m-3 rounded border"
      style={{
        width: "100%",
        aspectRatio: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        borderRadius: 10,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
      }}
    >
      <div className="row">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="column" style={{ marginLeft: "1rem" }}>
            <h3>{label}</h3>
          </div>
        </div>
        <div>
          <h1>
            <CountUp end={value} duration={1} prefix={prefix} decimals={decimals} />
          </h1>
        </div>
      </div>
      <div className="column">
        {icon && React.cloneElement(icon, { color: "purple", size: "5rem" })}
      </div>
    </div>
  );
};

DashBoardTile.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.element,
  prefix: PropTypes.string,
};

export default DashBoardTile;
