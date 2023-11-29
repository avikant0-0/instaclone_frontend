import { useState, useEffect } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/createPosts.css";
export default function CreatePost({ user, setAlert }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate("/");

  function uploadFile(e) {
    setFile(e.target.files[0]);
  }
  function makePost() {
    const formData = new FormData();
    formData.append("user", user);
    formData.append("caption", caption);
    formData.append("file", file);
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(
      "https://shy-erin-bluefish-gown.cyclic.app/createPost",
      requestOptions
    ).then((_res) => {
      setAlert({ variant: "success", message: "Post Created!" });
      navigate("/");
    });
  }
  useEffect(() => {
    if (!user) {
      setAlert({ variant: "danger", message: "Please sign in to post :)" });
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <Form className="center-form">
        <div className="create-post">
          <Form.Group className="mb-3">
            <img
              src={file ? URL.createObjectURL(file) : null}
              className="post-image"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <input type="file" accept="image/*" onChange={uploadFile} />
          </Form.Group>
          <Form.Group>
            <FormControl
              type="text"
              placeholder="Enter a Caption"
              onInput={(e) => setCaption(e.target.value)}
              className="mb-3"
            ></FormControl>
          </Form.Group>
          <Form.Group>
            <div className="post-button-rapper">
              <Button
                variant="primary"
                type="button"
                onClick={makePost}
                className="post-button"
              >
                Post
              </Button>
            </div>
          </Form.Group>
        </div>
      </Form>
    </>
  );
}
