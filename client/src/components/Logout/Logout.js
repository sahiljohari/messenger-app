import React from "react";
import { Link } from "react-router-dom";
import { clientUrls } from "../../clientUrls";

const Logout = () => {
  return (
    <div>
      <h2>You have successfully left the room.</h2>
      <Link to={clientUrls.root}>Login again</Link>
    </div>
  );
};

export default Logout;
