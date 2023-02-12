import React from "react";

const BookMark = (bookmark) => {
  let text;
  if (bookmark === true) {
    return (text = <i className="bi bi-bookmark-fill"></i>);
  } else if (bookmark === false) {
    return (text = <i className="bi bi-bookmark"></i>);
  }
  return text;
};

export default BookMark;
