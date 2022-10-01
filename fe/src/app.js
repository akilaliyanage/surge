import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { ToDoPage } from "./pages/todo-page";

export const App = () => {
  const { isLoading } = useAuth0();

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/todo" component={ToDoPage} />
    </Switch>
  );
};
