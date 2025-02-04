// import React from "react";

import Loader from "./Loader";

export default function withLoader(Component) {
  return function InnerComponent(props) {
    // eslint-disable-next-line react/prop-types
    if (props.loading) return <Loader />;
    return <Component {...props} />;
  };
}
