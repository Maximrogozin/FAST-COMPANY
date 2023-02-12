import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({
  name,
  _id,
  profession,
  rate,
  completedMeetings,
  qualities,
  onDelete,
  bookmark,
  onMark,
}) => {
  //   const bookMark = () => {
  //     let text;
  //     if (bookmark === true) {
  //       return (text = <i className="bi bi-bookmark-fill"></i>);
  //     } else if (bookmark === false) {
  //       return (text = <i className="bi bi-bookmark"></i>);
  //     }
  //     return text;
  //   };

  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((elem) => (
          <Qualitie {...elem} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <button onClick={() => onMark(_id)}>{BookMark(bookmark)}</button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
