"use client";
import Image from "next/image";
import { useEffect } from "react";
import Nav from "@/app/(components)/Nav";
import { useState } from "react";
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../app/src/dashboard.css";

export default function Dashboardform({ username }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeIndex, setLikeIndex] = useState(0);
  const [likelshow, setLikelshow] = useState(false);
  const [likershow, setLikershow] = useState(false);
  const [lshow, setLshow] = useState(false);
  const [rshow, setRshow] = useState(false);

  const leftover = posts.length % 5;

  const getPosts = async () => {
    try {
      const res = await axios.post("/api/getUserPosts", {
        username: username,
      });
      setPosts(res.data.posts);
      setLikes(res.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = (index) => {
    if (index === "currentIndex") {
      if (currentIndex + 9 < posts.length) {
        setCurrentIndex(currentIndex + 5);
      } else if (currentIndex + leftover + 4 < posts.length) {
        setCurrentIndex(currentIndex + leftover);
      }
    } else if (index === "likeIndex") {
      if (likeIndex + 9 < posts.length) {
        setLikeIndex(likeIndex + 5);
      } else if (likeIndex + leftover + 4 < posts.length) {
        setLikeIndex(likeIndex + leftover);
      }
    }
  };

  const goBack = (index) => {
    if (index === "currentIndex") {
      if (currentIndex - 5 >= 0) {
        setCurrentIndex(currentIndex - 5);
      } else if (currentIndex - leftover >= 0) {
        setCurrentIndex(currentIndex - leftover);
      }
    } else if (index === "likeIndex") {
      if (likeIndex - 5 >= 0) {
        setLikeIndex(likeIndex - 5);
      } else if (likeIndex - leftover >= 0) {
        setLikeIndex(likeIndex - leftover);
      }
    }
  };

  useEffect(() => {
    if (posts.length <= 5) {
      setLshow(false);
      setRshow(false);
    } else {
      setLshow(false);
      setRshow(true);
    }
  }, [currentIndex, posts]);

  useEffect(() => {
    if (posts.length <= 5) {
      setLshow(false);
      setRshow(false);
    } else {
      setLshow(false);
      setRshow(true);
    }
  }, [likeIndex, posts]);

  useEffect(() => {
    if (currentIndex + 9 < posts.length) {
      setRshow(true);
    } else if (currentIndex + leftover + 4 < posts.length && leftover !== 0) {
      setRshow(true);
    } else if (currentIndex + leftover + 4 < posts.length && leftover === 0) {
      setRshow(false);
    } else {
      setRshow(false);
    }

    if (currentIndex - 5 >= 0) {
      setLshow(true);
    } else if (currentIndex - leftover >= 0 && leftover !== 0) {
      setLshow(true);
    } else if (currentIndex - leftover === 0 && leftover === 0) {
      setLshow(false);
    } else {
      setLshow(false);
    }
  }, [currentIndex, posts]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <body className="dash">
      <title>Dashboard</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Nav />
      <section className="secd">
        <h1 className="dashh1">Welcome to {username}&apos;s Dashboard!</h1>
        <div className="comments">
          <h2 className="dashh2">Comments</h2>
          <br />
          <div className="dashcomment">
            <p className="dashp">You have no comments yet!</p>
          </div>
        </div>
        <div className="posts">
          <h2 className="dashh2">My Posts</h2>
          <br />
          <div className="dashpost">
            {posts.length > 0 && lshow && (
              <button className="postBtns" onClick={goBack}>
                <Image
                  src="/backBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goBack"
                />
              </button>
            )}
            {posts.length > 0 && !lshow && <div className="postBtns" />}
            {(posts.length === 0 || posts.length === undefined) && (
              <p className="dashp">You have no posts yet!</p>
            )}
            <TransitionGroup className="myPosts">
              {posts.length > 0 &&
                posts
                  .slice(currentIndex, currentIndex + 5)
                  .map((post, index) => (
                    <CSSTransition key={index} timeout={500} classNames="item">
                      <div className="myPost">
                        <p>{post.title}</p>
                        <p>{post.username}</p>
                        <p>Likes: {likes[index].number}</p>
                      </div>
                    </CSSTransition>
                  ))}
            </TransitionGroup>
            {posts.length > 0 && !rshow && <div className="postBtns" />}
            {posts.length > 0 && rshow && (
              <button className="postBtns" onClick={goNext}>
                <Image
                  src="/nextBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goNext"
                />
              </button>
            )}
          </div>
        </div>
        <div className="likes">
          <h2 className="dashh2">Liked Posts</h2>
          <br />
          <div className="dashpost">
            {posts.length > 0 && lshow && (
              <button className="postBtns" onClick={goBack}>
                <Image
                  src="/backBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goBack"
                />
              </button>
            )}
            {posts.length > 0 && !lshow && (
              <div className="postBtns" width="40" height="40" />
            )}
            {(posts.length === 0 || posts.length === undefined) && (
              <p className="dashp">You have no liked posts yet!</p>
            )}
            <TransitionGroup className="myPosts">
              {posts.length > 0 &&
                posts
                  .slice(currentIndex, currentIndex + 5)
                  .map((post, index) => (
                    <CSSTransition key={index} timeout={500} classNames="item">
                      <div className="myPost">
                        <p>{post.title}</p>
                        <p>{post.username}</p>
                        <p>Likes: {likes[index].number}</p>
                      </div>
                    </CSSTransition>
                  ))}
            </TransitionGroup>
            {posts.length > 0 && !rshow && (
              <div className="postBtns" width="40" height="40" />
            )}
            {posts.length > 0 && rshow && (
              <button className="postBtns" onClick={goNext}>
                <Image
                  src="/nextBtn.svg"
                  className="postsvgs"
                  layout="fill"
                  objectFit="contain"
                  alt="goNext"
                />
              </button>
            )}
          </div>
        </div>
        <div className="like">
          <h2 className="dashh2">Liked Comments</h2>
          <br />
          <div className="dashlike">
            <p className="dashp">You have no liked comments yet!</p>
          </div>
        </div>
      </section>
    </body>
  );
}
