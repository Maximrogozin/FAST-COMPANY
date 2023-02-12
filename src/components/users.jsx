import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Качества</th>
              <th>Профессия</th>
              <th>Встретился, раз</th>
              <th>Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((el) => (
              <User {...el} onDelete={rest.onDelete} onMark={rest.onMark} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
