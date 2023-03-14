import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersList from "./components/usersList";
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navBar";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:usersId?" component={UsersList} />
            </Switch>
        </div>
    );
}

export default App;
