import React from "react";
import HashLoader from "react-spinners/HashLoader";
export default function LoaderSpinners() {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (

    <div align="center" style={style}>
      <HashLoader size={45} color={"#007BFF"} />

    </div>
  );
}
