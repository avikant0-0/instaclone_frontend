import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, FormLabel, FormControl } from "react-bootstrap";
export default function Login({ setAlert, setUser }) {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();

    fetch("https://pyjtwc-3001.csb.app/getProfile?user=" + username)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAlert({ variant: "success", message: "Successfully logged in!!" });
          setUser(data[0].user_name);
          navigate("/");
        } else {
          setAlert({
            variant: "danger",
            message: "No user with that username exists!",
          });
        }
      })
      .catch((err) => setAlert({ variant: "danger", message: err.message }));
  }

  return (
    <Form className="center-form">
      <Form.Group className="mb-3">
        <FormLabel>Username</FormLabel>
        <FormControl
          type="text"
          placeholder="username"
          onInput={(e) => {
            setUserName(e.target.value);
          }}
        />
        <small className="form-text text-muted">
          Don't have an account?Sign Up <Link to="/sign-up">here!!</Link>
        </small>
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleLogin}>
        Login
      </Button>
    </Form>
  );
}
