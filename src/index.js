import React from "react";
import ReactDOM from "react-dom/client";
import Users from "./components/users";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return <Users />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
