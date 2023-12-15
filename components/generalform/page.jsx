"use client";
import "@/app/src/channels.css";
import React from "react";
import { IonIcon } from "@ionic/react";
import { useRef } from "react";
import { closeCircleOutline } from "ionicons/icons";
import Router, { useRouter } from "next/navigation";
import axios from "axios";
import Skeleton from "../skeletons/Skeleton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

import { useEffect } from "react";

function generalform({ admin }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const username = session?.user?.name;

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/general");

      if (res.status !== 200) {
        throw new Error("Failed to fetch posts");
      }

      setPosts(res.data.posts);
      setLoading(false);
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
      setLoad(true);
      const res = await Promise.race([
        axios.post("http://localhost:3001/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 3000),
        ),
      ]).catch((error) => {
        console.error("Error uploading post:", error);
      });
      await getPosts();
    } finally {
      setLoad(false);
      handleCloseFormClick();
      setTitle("");
      setContent("");
      setPostAnonymous("");
      setFiles("");
    }
  };

  const handleAddPostClick = () => {
    setInputBoxHidden(false);
  };

  const handleCloseFormClick = () => {
    setInputBoxHidden(true);
  };

  //   useEffect(() => {
  //     const imagesPreview = (input, placeToInsertImagePreview) => {
  //       if (input.files) {
  //         const filesAmount = input.files.length;
  //         for (let i = 0; i < filesAmount; i++) {
  //           const reader = new FileReader();
  //           reader.onload = function(event) {
  //             const img = document.createElement('img');
  //             img.src = event.target.result;
  //             img.style.width = '100px'; // Set the image width
  //             img.style.height = '100px'; // Set the image height
  //             img.style.objectFit = 'cover'; // Set the object-fit property
  //             img.style.margin = '10px'; // Set the margin
  //             placeToInsertImagePreview.appendChild(img);
  //           };
  //           reader.readAsDataURL(input.files[i]);
  //         }
  //       }
  //     };

  //     const inputFilesElement = document.getElementById('input-files');
  //     const previewImagesElement = document.querySelector('div.preview-images');

  //     if (inputFilesElement) {
  //       inputFilesElement.addEventListener('change', () => imagesPreview(inputFilesElement, previewImagesElement));
  //     }
  //     // Cleanup function
  //   return () => {
  //     if (inputFilesElement) {
  //       inputFilesElement.removeEventListener('change', () => imagesPreview(inputFilesElement, previewImagesElement));
  //     }
  //   };
  // }, []);

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/api/general", {
        data: {
          id: e.target.id.value,
        },
      });
      await getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <title>General</title>
      <div id="topBar">
        <a href="intro" className="titleg">
          General
        </a>
      </div>
      <br />
      <br />
      <a href="dashboard" id="backButton">
        Back to Dashboard
      </a>
      <div>
        <button id="GaddPostBtn" onClick={handleAddPostClick}>
          <span>Write a post</span>
        </button>
      </div>
      <div id="inputBoxGeneral" className={inputBoxHidden ? "hidden" : ""}>
        <form
          onSubmit={handleSubmit}
          id="postForm"
          encType="multipart/form-data"
        >
          <button id="closeForm" onClick={handleCloseFormClick}>
            <IonIcon icon={closeCircleOutline} />
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
          <button type="submit" className="postBtn" disabled={load}>
            {!load && <p className="ldd">Post</p>}
            {load && (
              <div className="load">
                <TailSpin
                  type="ThreeDots"
                  color="white"
                  height={20}
                  width={40}
                  style={{ marginRight: "5px" }}
                />
                <span className="ld">Loading...</span>
              </div>
            )}
          </button>
        </form>
        <div className="row">
          <div className="col-sm-12">
            <div className="preview-images" />
          </div>
        </div>
      </div>
      <div className="bg">
        <div id="posts" className="word-box">
          {loading
            ? Array.from({ length: 15 }).map((_, i) => (
                <div className="borderClass" key={i}>
                  <React.Fragment>
                    <Skeleton classes="title width-40" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <Skeleton classes="text width-70" />
                    <br />
                    <Skeleton classes="text width-pic" />
                    <br />
                    <Skeleton classes="text width-user" />
                    <br />
                    <Skeleton classes="text width-40" />
                    <Skeleton classes="text width-delete" />
                    <br />
                  </React.Fragment>
                </div>
              ))
            : posts.map((post) => (
                <div className="postsG" key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  {post.pictureUrl.map((image) => (
                    <div className="imgs">
                      <Image
                        src={`/${image.filename}`}
                        width="300"
                        height="300"
                      />
                    </div>
                  ))}
                  {post.username === username && !admin && (
                    <form onSubmit={handleSub} id="deleteForm">
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button type="submit" className="deleteBtn">
                        <span>Delete</span>
                      </button>
                    </form>
                  )}
                  {admin && (
                    <form onSubmit={handleSub} id="deleteForm">
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button type="submit" className="deleteBtn">
                        <span>Admin Delete</span>
                      </button>
                    </form>
                  )}
                </div>
              ))}
        </div>
      </div>
      <div id="spacing" />
      <br />
    </>
  );
}

export default generalform;
