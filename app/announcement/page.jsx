"use client";
import "@/app/src/channels.css";
import SocialMedia from "@/app/(icons)/SocialMedia";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Announcement = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("/api/announcement");

      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }

      setPosts(res.data.posts);
    } catch (error) {
      console.log("Error loading posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <title>Announcement</title>
      <div id="topBar">
        <a href="intro" className="title">
          Announcement
        </a>
      </div>
      <br />
      <br />
      <a href="dashboard" id="backButton">
        Back to Dashboard
      </a>
      <div className="bg">
        <div id="posts" className="word-box">
          {posts.map((post) => (
            <>
              <div className="posts">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      <div id="spacing" />
      <br />
      <SocialMedia />
    </>
  );
};

export default Announcement;
