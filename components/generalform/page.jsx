"use client";
import "@/app/src/channels.css";
import SocialMedia from "@/app/(icons)/SocialMedia";
import Router, { useRouter } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

const generalform = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/general");

      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }

      setPosts(res.data.posts);
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error loading posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // const postslikes = await getPosts(postslikes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [inputBoxHidden, setInputBoxHidden] = useState(true);
  const username = session?.user?.name;

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0 && !title && !content) {
      console.warn(
        "No files, title, or content. Please provide at least one of them.",
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postAnonymous", postAnonymous);
    formData.append("group", "general");
    formData.append("username", username);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Post uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const handleAddPostClick = () => {
    setInputBoxHidden(false);
  };

  const handleCloseFormClick = () => {
    setInputBoxHidden(true);
  };

  return (
    <>
      <title>General</title>
      <div id="topBar">
        <a href="intro" className="title">
          General
        </a>
      </div>
      <br />
      <br />
      <a href="dashboard" id="backButton">
        Back to Dashboard
      </a>
      <div>
        <button id="addPostBtn" onClick={handleAddPostClick}>
          <span>Write a post</span>
        </button>
      </div>
      <div id="inputBox" className={inputBoxHidden ? "hidden" : ""}>
        <form
          onSubmit={handleSubmit}
          id="postForm"
          encType="multipart/form-data"
        >
          <button id="closeForm" onClick={handleCloseFormClick}>
            x
          </button>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="content">Write sth: </label>
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <br />
          <label htmlFor="input-files">Pictures:</label>
          <input
            type="file"
            name="files"
            id="input-files"
            className="form-control-file border"
            onChange={handleFileChange}
            multiple
          />
          <br />
          <div className="switchForm">
            <label className="switch">
              <input
                type="checkbox"
                name="postAnonymous"
                checked={postAnonymous}
                onChange={() => setPostAnonymous(!postAnonymous)}
              />
              <span className="slider round">
                <h6 className="posta">
                  Anonymously?
                  <p />
                </h6>
              </span>
            </label>
          </div>
          <div id="uploadPostStatus" />
          <br />
          <br />
          <button type="submit">Post</button>
        </form>
        <div className="row">
          <div className="col-sm-12">
            <div className="preview-images" />
          </div>
        </div>
      </div>
      {loading ? (
        // Render the skeleton loader when loading is true
        <div className="loading-container">
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              height={70}
              width={"40%"}
              duration={2}
              color={"#e0e0e0"}
              highlightColor={"#f0f0f0"}
              className="skeleton"
            />
          ))}
        </div>
      ) : error ? (
        // If there was an error, render an error message
        <div>Error loading posts</div>
      ) : (
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
      )}
      <div id="spacing" />
      <br />
      <SocialMedia />
    </>
  );
};

export default generalform;
