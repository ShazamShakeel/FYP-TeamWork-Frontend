import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/navBar/NavBar";
import Projects from "./Projects";
import Project from "./Project";
import Profile from "./Profile";

const WrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .pages-container {
    flex: 1;
    width: 100%;
    overflow-x: none;
    overflow-y: auto;
  }
`;

const ProtectedRoutes = () => {
  return (
    <WrapperStyled>
      <Router>
        <NavBar />
        <div className="pages-container">
          <Switch>
            <Route exact path="/">
              <Projects />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/b/:id">
              <Project />
            </Route>
          </Switch>
        </div>
      </Router>
    </WrapperStyled>
  );
};

export default ProtectedRoutes;
