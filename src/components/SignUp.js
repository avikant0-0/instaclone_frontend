import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function SignUp({ setAlert, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  function createAccount(e) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
      }),
    };
    fetch(
      "https://shy-erin-bluefish-gown.cyclic.app/createUser",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAlert({
          variant: "success",
          message: "Your account has been created",
        });
        setUser(data.user_name);
        console.log("User set to: ", data.user_name);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }
  function updateUserName(e) {
    setUserName(e.target.value);
  }

  function updateFirstName(e) {
    setFirstName(e.target.value);
  }

  function updateLastName(e) {
    setLastName(e.target.value);
  }
  return (
    <Form className="center-form">
      <Form.Group className="mb-4">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          onInput={updateUserName}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>FirstName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Firstname"
          onInput={updateFirstName}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>LastName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Lastname"
          onInput={updateLastName}
        />
      </Form.Group>
      <Button variant="primary" type="button" onClick={createAccount}>
        Create Account
      </Button>
    </Form>
  );
}
