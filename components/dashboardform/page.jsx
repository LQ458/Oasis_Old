"use client";
import Image from "next/image";
import { useEffect } from "react";
import $ from "jquery";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import "../../app/src/dashboard.css";

export default function Dashboardform({ username }) {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const leftover = posts.length % 5;

  const getPosts = async () => {
    try {
      const res = await axios.post("/api/getUserPosts", {
        username: username,
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = () => {
    if (currentIndex + 9 < posts.length) setCurrentIndex(currentIndex + 5);
    else if (currentIndex + leftover + 4 < posts.length) {
      setCurrentIndex(currentIndex + leftover);
      console.log(leftover);
      console.log(posts.length);
    }
  };

  const goBack = () => {
    if (currentIndex - 5 >= 0) setCurrentIndex(currentIndex - 5);
    else if (currentIndex - leftover >= 0) {
      setCurrentIndex(currentIndex - leftover);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    var channels = $(".channel");
    for (var i = 0; i < channels.length; i++) {
      $(channels[i]).css("animation-delay", i * 0.2 + "s");
    }

    let liftInterval;

    $(function () {
      $(".channel").hover(
        function () {
          var iconClass = $(this).data("icon");
          $(".icon").removeClass("lift");
          $("." + iconClass).addClass("lift");
        },
        function () {
          $(".icon").removeClass("lift");
        },
      );
    });
    $(".channel").click(
      function () {
        var iconClass = $(this).data("icon");
        $(".icon").removeClass("lift");
        liftInterval = setInterval(() => {
          $("." + iconClass).toggleClass("lift");
        }, 500);
      },
      function () {
        clearInterval(liftInterval);
        $(".icon").removeClass("lift");
      },
    );
  }, []);
  return (
    <body className="dash">
      <title>Dashboard</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="dash">
        <div className="container">
          <div className="dblock">
            <Link href="/profile" className="icon">
              <Image
                src="/person-circle-outline.svg"
                width="60"
                height="60"
                alt="person"
              />
            </Link>
          </div>
          <div className="dblock">
            <div className="icon icon-2">
              <Image
                src="/earth-outline.svg"
                width="40"
                height="40"
                alt="earth"
              />
            </div>
            <li>
              <Link className="channel" data-icon="icon-2" href="/general">
                General
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-3">
              <Image
                src="/chatbox-outline.svg"
                width="40"
                height="40"
                alt="chatbox"
              />
            </div>
            <li>
              <Link className="channel" data-icon="icon-3" href="/announcement">
                News
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-4">
              <Image src="/heart.svg" width="40" height="40" alt="heart" />
            </div>
            <li>
              <Link className="channel" data-icon="icon-4" href="/confession">
                Confession
              </Link>
            </li>
          </div>
          <div className="dblock">
            <div className="icon icon-5">
              <Image
                src="/book-outline.svg"
                width="40"
                height="40"
                alt="book"
              />
            </div>
            <li>
              <Link href="/academics" className="channel" data-icon="icon-5">
                Academics
              </Link>
            </li>
          </div>
        </div>
      </nav>
      <br />
      <section className="secd">
        <h1 className="dashh1">Welcome to {username}&apos;s Dashboard!</h1>
        <div className="comments">
          <h2 className="dashh2">Comments</h2>
          <div className="dashcomment">
            <p className="dashp">You have no comments yet!</p>
          </div>
        </div>
        <div className="posts">
          <h2 className="dashh2">My Posts</h2>
          <br />
          <div className="dashpost">
            {posts.length > 0 && (
              <button className="postBtns" onClick={goBack}>
                <Image src="/backBtn.svg" width="40" height="40" />
              </button>
            )}
            {(posts.length === 0 || posts.length === undefined) && (
              <p className="dashp">You have no posts yet!</p>
            )}
            <div className="myPosts">
            {posts.length > 0 &&
              posts.slice(currentIndex, currentIndex + 5).map((post, index) => (
                <div className="myPost" key={index}>
                  <p className="dashp">{post.title}</p>
                  <p className="dashp">{post.username}</p>
                </div>
              ))}
              </div>
            {posts.length > 0 && (
              <button className="postBtns" onClick={goNext}>
                <Image src="/nextBtn.svg" width="40" height="40" />
              </button>
            )}
          </div>
        </div>
        <div className="likes">
          <h2 className="dashh2">Liked Posts</h2>
          <div className="dashlike">
            <p className="dashp">You have no liked posts yet!</p>
          </div>
        </div>
        <div className="like">
          <h2 className="dashh2">Liked Comments</h2>
          <div className="dashlike">
            <p className="dashp">You have no liked comments yet!</p>
          </div>
        </div>
      </section>
    </body>
  );
}
