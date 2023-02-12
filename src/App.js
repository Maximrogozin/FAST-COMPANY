import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((users) => users._id !== userId));
  };

  const handleToggleBookMark = (userId) => {
    setUsers(
      users.map((obj) =>
        obj._id === userId ? { ...obj, bookmark: !obj.bookmark } : obj
      )
    );
  };

  return (
    <div>
      <h2>{SearchStatus(users.length)}</h2>
      <Users
        users={users}
        onDelete={handleDelete}
        onMark={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
