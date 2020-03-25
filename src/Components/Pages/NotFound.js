import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1 style={{ fontSize: 120, textAlign: "center", fontWeight: 100 }}>
        404
      </h1>
      <p style={{ textAlign: "center" }} className='lead'>
        The page you are looking for is not exist.
      </p>
    </div>
  );
};

export default NotFound;
