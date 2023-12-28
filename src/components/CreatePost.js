import { useState, useEffect } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createClient } from "@sanity/client";
import "../css/createPosts.css";
export default function CreatePost({ user, setAlert }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate("/");

  function uploadFile(e) {
    setFile(e.target.files[0]);
  }
  async function makePost() {
    const client = createClient({
      projectId: "0yv1juf6",
      dataset: "production",
      apiVersion: "2021-08-29",
      token:
        "skSp9hCw8sjLUzi3t02752hAUBnDrebTxTfGVo1iGw4kqsfnOZBkTUMBKxZ1l8zePdq8P32NwLUoJbn6Cr6ApTD0Z9IVfHar3r4XNO4Iv1N6HK2i6krUwXOha1FJqOkP20HQYeIVWXNran8YBEGrwYMfnmVPQOxZaH0TRuRel6BfBSVEssSU",
      useCdn: false,
    });

    const useri = await client.fetch(
      `*[_type == "user" && user_name == $username]{
      _id
    }`,
      { username: user }
    );
    const userid = useri[0]._id;
    client.assets
      .upload("image", file, {
        filename: "image",
        contentType: file.type,
      })
      .then((data) => {
        const doc = {
          _type: "post",
          author: { _ref: userid },
          photo: { asset: { _ref: data._id } },
          description: caption,
          created_at: new Date(),
        };
        client.create(doc).then((data) => {
          setAlert({ variant: "success", message: "Post Created!" });
          navigate("/");
        });
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
