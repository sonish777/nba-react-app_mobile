import React from "react";

const WithSpinner = (WrappedComponent, isLoading) => {
  return (props) => {
    if (isLoading) {
      return <p>Loading. . .</p>;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithSpinner;
