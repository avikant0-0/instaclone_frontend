import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import Alert from "react-bootstrap/Alert";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  ModalBody,
} from "react-bootstrap";

export default function EditProfile({
  user,
  show,
  hideCallBack,
  profileData,
  setAlert,
}) {
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    setFirstName(profileData.first_name);
    setFirstName(profileData.last_name);
    setFirstName(profileData.bio);
    console.log(firstName);
    console.log(lastName);
  }, [profileData]);

  async function updateProfile() {
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
      { username: user.user }
    );
    const userid = useri[0]._id;
    if (file) {
      client.assets
        .upload("image", file, {
          filename: "image",
          contentType: file.type,
        })
        .then((data) => {
          client
            .patch(userid)
            .set({
              first_name: firstName,
              last_name: lastName,
              bio,
              photo: { asset: { _ref: data._id } },
            })
            .commit();
        })
        .then((_res) => {
          <Alert key="info" variant="info">
            Profile Updated!
          </Alert>;
          hideCallBack();
        });
    } else {
      client
        .patch(userid)
        .set({
          first_name: firstName,
          last_name: lastName,
          bio,
        })
        .commit()
        .then((_res) => {
          <Alert key="info" variant="info">
            Profile Updated!
          </Alert>;
          hideCallBack();
        });
    }
  }

  return (
    <>
      <Modal show={show} onHide={hideCallBack}>
        <Modal.Header closeButton>Edit Profile</Modal.Header>
        <ModalBody>
          <Form>
            <FormGroup className="mb-3">
              {profileData.photo && !file ? (
                <img
                  src={profileData.photo.asset.url}
                  className="upload-image"
                />
              ) : (
                <img
                  src={file ? URL.createObjectURL(file) : null}
                  className="upload-image"
                />
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="First Name"
                defaultValue={profileData.first_name}
                onInput={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Last Name"
                defaultValue={profileData.last_name}
                onInput={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Bio"
                defaultValue={profileData.bio}
                onInput={(e) => setBio(e.target.value)}
              />
            </FormGroup>
          </Form>
          <div>
            <Button variant="primary" type="button" onClick={updateProfile}>
              Update!!
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
