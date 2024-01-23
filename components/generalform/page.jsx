"use client";
import "@/app/src/channels.css";
import React from "react";
import { IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import axios from "axios";
import Skeleton from "../skeletons/Skeleton";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";

function Generalform({ admin, username }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [scale, setScale] = useState(1);
  const [check, setCheck] = useState([]);
  const [imgCheck, setImgCheck] = useState([]);
  const [ok, setOk] = useState(false);
  const [posts, setPosts] = useState([]);
  const [backCheck, setBackCheck] = useState(false);
  const [msg, setMsg] = useState(null);
  const [title, setTitle] = useState("");
  const [likeNum, setLikeNum] = useState([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [inputBoxHidden, setInputBoxHidden] = useState(true);
  const [status, setStatus] = useState(true);

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

  const imagePreview = (index, postIndex) => {
    document.body.style.overflowY = "hidden";
    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setBackCheck(true);
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = true; // set the first element to false
    setCheck(newArray); // update the state
  };

  const imagePreview1 = (postIndex) => {
    document.body.style.overflowY = "hidden";
    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setOk(true);
  };

  const handleWheel = (e) => {
    setScale((prevScale) => {
      let newScale = prevScale + e.deltaY * -0.1;
      console.log("deltaY:", e.deltaY, "newScale:", newScale);
      // Prevent the scale from becoming too small or negative
      newScale = Math.max(0.4, newScale);
      // Prevent the scale from becoming too large
      newScale = Math.min(2, newScale);
      return newScale;
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === undefined && usernmae === null) {
      alert("You must login to post");
      return;
    }

    if (files.length === 0 && !title && !content) {
      alert(
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
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        await getPosts();
        setLoad(false);
        handleCloseFormClick();
        setTitle("");
        setContent("");
        setPostAnonymous("");
        setFiles("");
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const handleAddPostClick = () => {
    setInputBoxHidden(false);
  };

  const handleCloseFormClick = () => {
    setInputBoxHidden(true);
  };

  const handleCheckClose = (index, postIndex) => {
    let Array = [...check]; // create a copy of the current state
    Array[postIndex] = false; // set the first element to false
    setImgCheck(Array); // update the state
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setCheck(newArray); // update the state
    setBackCheck(false);
    document.body.style.overflowY = "scroll";
  };

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.body.style.overflowY = "scroll";
  };

  const getSpec = async () => {};

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

  const sendLike = async (e) => {
    e.preventDefault();
    setStatus(!status);
    try {
      const res = await axios.post("/api/fetchLike", {
        postId: e.target.id.value,
        sendUsername: username,
        status: status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(backCheck);
  }, [backCheck]);

  useEffect(() => {
    getPosts();
  }, []);
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
      <button className="adp" id="GaddPostBtn" onClick={handleAddPostClick}>
        <span>Write a post</span>
      </button>
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
            : posts.map((post, postIndex) => (
                <div className="postsG" key={postIndex}>
                  <div>
                    <h3>{post.title}</h3>
                    <br />
                    <div className="contents">{post.content}</div>
                    <br />
                    <br />
                    <div className="imgs">
                      {post.pictureUrl.length > 1 &&
                        post.pictureUrl.map((image, index) => (
                          <>
                            <button
                              onClick={() => imagePreview(index, postIndex)}
                            >
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className="Images"
                              />
                            </button>
                            {check[index] && imgCheck[postIndex] && (
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                id={`${post._id}-${index}`}
                                width={300 * scale}
                                height={300 * scale}
                                className="above"
                                onWheel={handleWheel}
                              />
                            )}
                            {check[index] && imgCheck[postIndex] && (
                              <button
                                id="closePreview"
                                onClick={() =>
                                  handleCheckClose(index, postIndex)
                                }
                              >
                                X
                              </button>
                            )}
                            {backCheck && <div className="blocks" />}
                          </>
                        ))}
                      {post.pictureUrl.length === 1 &&
                        post.pictureUrl.map((image, index) => (
                          <>
                            <button onClick={() => imagePreview1(postIndex)}>
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                width="300"
                                height="300"
                                className="Image"
                              />
                            </button>
                            {ok && imgCheck[postIndex] && (
                              <img
                                src={`/${image.filename}`}
                                key={index}
                                alt={image.filename}
                                width={300 * scale}
                                height={300 * scale}
                                className="above"
                                onWheel={handleWheel}
                              />
                            )}

                            {ok && imgCheck[postIndex] && (
                              <button
                                id="closePreview"
                                onClick={() => handleClose(postIndex)}
                              >
                                X
                              </button>
                            )}

                            {ok && imgCheck[postIndex] && (
                              <div className="blocks" />
                            )}
                          </>
                        ))}
                    </div>
                    <br />
                    <br />
                    {(post.postAnonymous === false ||
                      post.postAnonymous === null ||
                      post.postAnonymous === undefined ||
                      admin === true) && (
                      <p className="usr">posted by {post.username}</p>
                    )}
                    <br />
                    <p className="postT">posted on {post.postingtime}</p>
                    <br />
                    <form onSubmit={sendLike}>
                      <input type="hidden" name="id" id="id" value={post._id} />
                      <button
                        className="likeBtn"
                        type="submit"
                        id={`like${post._id}`}
                      >
                        <span>Like</span>
                      </button>
                    </form>
                    {post.username === username && !admin && (
                      <form onSubmit={handleSub} id="deleteForm">
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={post._id}
                        />
                        <button type="submit" className="deleteBtn">
                          <span>Delete</span>
                        </button>
                      </form>
                    )}
                    {admin && (
                      <form onSubmit={handleSub} id="deleteForm">
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={post._id}
                        />
                        <button type="submit" className="deleteBtn">
                          <span>Admin Delete</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div id="spacing" />
      <br />
    </>
  );
}

export default Generalform;
