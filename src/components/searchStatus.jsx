import React from "react";

const SearchStatus = (length) => {
  if (length > 4 || length === 1) {
    return (
      <span className="badge bg-primary">
        {length} человек тусанет с тобой сегодня
      </span>
    );
  } else if (length > 1 && length < 5) {
    return (
      <span className="badge bg-primary">
        {length} человека тусанет с тобой сегодня
      </span>
    );
  } else if (length === 0) {
    return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
  }
};

export default SearchStatus;
