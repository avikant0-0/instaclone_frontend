import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, NavbarText } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "../css/App.css";

import Allposts from "./AllPosts";
import AlertDismissible from "./AlertDismissible";
import CreatePost from "./CreatePost";
import EditProfile from "./EditProfile";
import Login from "./Login";
import Profile from "./Profile";
import ProfileItem from "./ProfileItem";
import Search from "./Search";
import SignUp from "./SignUp";

function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState("");
  return (
    <div className="fill-parent">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>Instagram Clone</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Feed</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create-post">
                  <Nav.Link>Post</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {user ? (
                  <NavbarText>
                    Signed In As:<Link to={"/profile/" + user}> {user} | </Link>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => {
                        setUser("");
                        setAlert({
                          variant: "warning",
                          message: "You are now signed out",
                        });
                      }}
                    >
                      LogOut
                    </Button>
                  </NavbarText>
                ) : (
                  <NavbarText>
                    <Link to="/login">Not Signed In</Link>
                  </NavbarText>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {alert ? (
          <AlertDismissible {...alert} deleteAlert={() => setAlert(null)} />
        ) : null}
        <Routes>
          <Route element={<Allposts user={user} />} path="/" exact />
          <Route
            element={<Login setAlert={setAlert} setUser={setUser} />}
            path="/login"
          />
          <Route
            element={<SignUp setAlert={setAlert} setUser={setUser} />}
            path="/sign-up"
          />
          <Route
            element={<Profile user={user} setAlert={setAlert} />}
            path="/profile/:username"
          />
          <Route element={<Search />} path="/search" />
          <Route
            element={<CreatePost user={user} setAlert={setAlert} />}
            path="/create-post"
          />
          <Route />
          <Route
            element={<EditProfile user={user} setAlert={setAlert} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
