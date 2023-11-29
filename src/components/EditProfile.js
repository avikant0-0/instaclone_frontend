import { useEffect, useState } from "react";
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
  }, [profileData]);

  function updateProfile() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", user.user);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(
      "https://shy-erin-bluefish-gown.cyclic.app/updateProfile",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        <Alert key="info" variant="info">
          Profile Updated!
        </Alert>;
        if (file) data.image_url = URL.createObjectURL(file);
        hideCallBack();
      })
      .catch((err) => {
        setAlert({ variant: "danger", message: err.message });
        hideCallBack();
      });
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
