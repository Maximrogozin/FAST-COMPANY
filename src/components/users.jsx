import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };
  const renderPhrase = () => {
    if (users.length > 4 || users.length === 1) {
      return (
        <span className="badge bg-primary">
          {users.length} человек тусанет с тобой сегодня
        </span>
      );
    } else if (users.length > 1 && users.length < 5) {
      return (
        <span className="badge bg-primary">
          {users.length} человека тусанет с тобой сегодня
        </span>
      );
    } else if (users.length === 0) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    }
  };

  return (
    <>
      <h2>{renderPhrase()}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((el) => (
            <tr key={el._id}>
              <td>{el.name}</td>
              <td>
                {el.qualities.map((elem) => (
                  <span key={elem._id} className={"badge bg-" + elem.color}>
                    {elem.name}
                  </span>
                ))}
              </td>
              <td>{el.profession.name}</td>
              <td>{el.completedMeetings}</td>
              <td>{el.rate} /5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(el._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
