import { Card, CardBody, CardFooter, CardText } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AllPosts({ user }) {
  const [allPostsData, setAllPosts] = useState(null);
  useEffect(() => {
    if (!user) {
      fetch("https://pyjtwc-3001.csb.app/getAllPosts")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })  
        .then((data) => setAllPosts(data))
        .catch((err) => {
          console.error(
            "There has been a problem with your fetch operation:",
            err
          );
        });
    } else {
      fetch(
        "https://pyjtwc-3001.csb.app/getPostsOfFollowing?user=" + user
      )
        .then((res) => res.json())
        .then((data) => setAllPosts(data))
        .then((err) => console.error(err));
    }
  }, [user]);
  return (
    <>
      <div className="center mt-3">
        {allPostsData ? (
          allPostsData.map((post, index) => (
            <div
              className="center m-2"
              style={{ minWidth: "30%", maxWidth: "400px" }}
              key={index}
            >
              <Card>
                <div className="d-flex align-items-center flex-column">
                  <Card.Img
                    variant="top"
                    src={post.photo.asset.url}
                    style={{ width: "100%" }}
                  ></Card.Img>
                </div>
                <CardBody>
                  <Link to={"/profile/" + post.username}>
                    <Card.Title>@{post.username}</Card.Title>
                  </Link>
                  <CardText>{post.description}</CardText>
                </CardBody>
                <CardFooter className="text-muted">
                  {post.created_at}
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <p>No Posts To Display</p>
        )}
      </div>
    </>
  );
}
