import React from "react";

const Qualitie = ({ _id, color, name }) => {
  return (
    <span key={_id} className={`mx-1 badge bg-${color}`}>
      {name}
    </span>
  );
};

export default Qualitie;
