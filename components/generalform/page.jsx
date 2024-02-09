"use client";
import "@/app/src/channels.css";
import React from "react";
import axios from "axios";
import Skeleton from "../skeletons/Skeleton";
import { useState, useRef } from "react";
import { TailSpin } from "react-loader-spinner";
import { Picker } from "emoji-mart";
import ColorThief from "colorthief";
import { useEffect } from "react";
import path from "path";

function Generalform({ admin, username }) {
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
  const [likes, setLikes] = useState([]);
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [likestatuses, setLikestatuses] = useState([]);
  const [postAnonymous, setPostAnonymous] = useState(false);
  const [inputBoxHidden, setInputBoxHidden] = useState(true);
  const [likeloads, setLikeloads] = useState(true);
  const [likeload, setLikeload] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [commentOpen, setCommentOpen] = useState([].map(() => false));
  const [titleWords, setTitleWords] = useState(0);
  const [contentWords, setContentWords] = useState(0);
  const [commentWords, setCommentWords] = useState(0);
  const [commentFiles, setCommentFiles] = useState([]);
  const [anonymous, setAnonymous] = useState(false);
  const [commentUploadLoad, setCommentUploadLoad] = useState(false);
  const [commentDisplay, setCommentDisplay] = useState(false);
  const [temp, setTemp] = useState(false);
  // The commentDisplay function is for showing the comment post button and the picturen upload button. If the content is focused, or in other words, the user is writing or editing the comment, it shows, else, we need to make space for showing other comments.
  let newArray;

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
  const fetchLikes = async () => {
    try {
      console.log("fetching likes");
      setLikeloads(true);
      const res = await axios.get("/api/fetchLike", {
        params: {
          username: username,
          forum: "general",
        },
      });
      setLikes(res.data.likes);
      setLikestatuses(res.data.likestatuses);
      setLikeloads(false);
    } catch (error) {
      console.log(error);
    }
  };

  const imagePreview = (index, postIndex, img) => {
    document.body.style.overflowY = "hidden";
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = path.join("/", img.filename); // Use the path from your img object

    image.onload = async function () {
      const colors = await colorThief.getPalette(image, 2);
      const rgbColors = colors.map((color) => `rgb(${color.join(", ")})`);
      document.documentElement.style.setProperty("--1-color", rgbColors[0]);
      document.documentElement.style.setProperty("--2-color", rgbColors[1]);
      document.documentElement.style.setProperty("--3-color", rgbColors[2]);
    };

    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setBackCheck(true);
    let newArray = [...check]; // create a copy of the current state
    newArray[index] = true; // set the first element to false
    setCheck(newArray); // update the state
  };

  const imagePreview1 = (postIndex, img) => {
    document.body.style.overflowY = "hidden";
    const colorThief = new ColorThief();
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = path.join("/", img.filename); // Use the path from your img object

    image.onload = async function () {
      const colors = await colorThief.getPalette(image, 2);
      const rgbColors = colors.map((color) => `rgb(${color.join(", ")})`);
      document.documentElement.style.setProperty("--1-color", rgbColors[0]);
      document.documentElement.style.setProperty("--2-color", rgbColors[1]);
      document.documentElement.style.setProperty("--3-color", rgbColors[2]);
    };
    let Array = [...imgCheck]; // create a copy of the current state
    Array[postIndex] = true; // set the first element to false
    setImgCheck(Array); // update the state
    setOk(true);
  };

  const handleWheel = (e) => {
    setScale((prevScale) => {
      let newScale = prevScale + e.deltaY * -0.1;
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
    setContentWords(0);
    setTitleWords(0);

    if (username === undefined && username === null) {
      alert("You must login to post");
      return;
    }

    if (
      title === null ||
      title === undefined ||
      title === "Enter title (20 words max)"
    ) {
      alert("Title cannot be empty");
      return;
    } else if (
      content === null ||
      content === undefined ||
      content === "Write sth..."
    ) {
      alert("Content cannot be empty");
      return;
    } else if (title.split(" ").filter((word) => word).length > 20) {
      alert("Title cannot be more than 20 words");
      return;
    } else if (content.split(" ").filter((word) => word).length > 1000) {
      console.log(content.split(" ").length);
      alert("Content cannot be more than 1000 words");
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOURCE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 201) {
        await getPosts();
        setLoad(false);
        handleCloseFormClick();
        setMsg("Post created successfully");
        setTitle("");
        setContent("");
        setFiles([]);
        setPostAnonymous(false);
      }
      fetchLikes();
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const handleAddPostClick = () => {
    setInputBoxHidden(!inputBoxHidden);
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
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
    document.body.style.overflowY = "scroll";
  };

  const handleClose = (index) => {
    setOk(false);
    let newArray = [...imgCheck]; // create a copy of the current state
    newArray[index] = false; // set the first element to false
    setImgCheck(newArray); // update the state
    document.documentElement.style.setProperty("--1-color", "#f2f4f5");
    document.documentElement.style.setProperty("--2-color", "#f2f4f5");
    document.documentElement.style.setProperty("--3-color", "#f2f4f5");
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

  const sendLike = async (category, likeIndex, e) => {
    e.preventDefault();
    try {
      newArray = [...likeload];
      newArray[likeIndex] = true;
      setLikeload(newArray);
      const postId = e.target.id.value;
      const likestatus = likestatuses?.find(
        (likestatus) => likestatus.postId === postId,
      );
      const currentStatus = likestatus?.status ?? false;
      const res = await axios.post("/api/fetchLike", {
        postId,
        sendUsername: username,
        status: !currentStatus,
        category,
      });
      setLikestatuses(res.data.likestatuses);
      setLikes(res.data.likes);
      newArray[likeIndex] = false;
      setLikeload(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    await getPosts();
    await fetchLikes();
  };

  const handleComment = (index) => {
    const newArray = [...commentOpen];
    newArray[index] = !newArray[index];
    if (newArray[index] === true) {
      setCommentDisplay(false);
      setTemp(false);
      setComment("");
      setCommentFiles([]);
      setAnonymous(false);
    }
    setCommentOpen(newArray);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentWords(0);

    if (username === undefined && username === null) {
      alert("You must login to post");
      return;
    }

    if (
      comment === null ||
      comment === undefined ||
      comment === "Comment on this post..."
    ) {
      alert("Comment cannot be empty");
      return;
    } else if (comment.split(" ").filter((word) => word).length > 500) {
      alert("Comment cannot be more than 500 words");
      return;
    }

    const formData = new FormData();
    formData.append("content", comment);
    formData.append("anonymous", anonymous);
    formData.append("group", "general");
    console.log("id" + e.target.id.value);
    formData.append("postId", e.target.id.value);
    formData.append("username", username);

    if (commentFiles) {
      for (let i = 0; i < commentFiles.length; i++) {
        formData.append("files", commentFiles[i]);
      }
    }
    try {
      setCommentUploadLoad(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOURCE_URL}/uploadComment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 201) {
        // await getComments();
        setCommentUploadLoad(false);
        // Close the comment
        setMsg("Comment Saved Successfully");
        setComment("");
        setCommentFiles([]);
        setAnonymous(false);
      }
      fetchLikes();
    } catch (error) {
      console.log(error);
      setCommentUploadLoad(false);
    }
  };

  useEffect(() => {
    getPosts();
    fetchLikes();
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
      <button className="refreshBtn" onClick={handleRefresh}>
        Refresh
      </button>
      <button className="adp" id="GaddPostBtn" onClick={handleAddPostClick}>
        <span>Write a post</span>
      </button>
      {!inputBoxHidden && (
        <div id="inputBoxGeneral">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            id="postForm"
            encType="multipart/form-data"
          >
            <div
              contentEditable
              required
              id="title"
              name="title"
              onInput={(e) => {
                const value = e.target.textContent;
                setTitleWords(value.split(" ").filter((word) => word).length);
              }}
              onFocus={(e) => {
                if (e.target.textContent === "Enter title (20 words max)") {
                  e.target.textContent = "";
                  e.target.style.color = "black";
                }
              }}
              onBlur={(e) => {
                if (e.target.textContent === "") {
                  e.target.textContent = "Enter title (20 words max)";
                  e.target.style.color = "gray";
                }
              }}
            >
              {title === "" ? "Enter title (20 words max)" : title}
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  fontSize: "0.85rem",
                  right: "12vw",
                  bottom: "0vh",
                }}
              >
                {titleWords}
              </span>
            </div>
            <br />
            <br />
            <div
              contentEditable
              required
              id="content"
              name="content"
              onInput={(e) => {
                const value = e.target.textContent;
                setContentWords(value.split(" ").filter((word) => word).length);
              }}
              onFocus={(e) => {
                if (e.target.textContent === "Write sth...") {
                  e.target.textContent = "";
                  e.target.style.color = "black";
                }
              }}
              onBlur={(e) => {
                if (e.target.textContent === "") {
                  e.target.textContent = "Write sth...";
                  e.target.style.color = "gray";
                }
              }}
            >
              {content === "" ? "Write sth..." : content}
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  fontSize: "0.85rem",
                  right: "0.5vw",
                  bottom: "0vh",
                }}
              >
                {contentWords}
              </span>
            </div>
            <br />
            <br />
            <label htmlFor="input-files" className="picUpload">
              Pictures:
              <input
                type="file"
                id="input-files"
                className="form-control-file border"
                onChange={handleFileChange}
                multiple
              />
            </label>
            <div className="formBottom">
              <button
                type="submit"
                className="postBtn"
                disabled={load}
                onClick={() => {
                  setContent(document.getElementById("content").textContent),
                    setTitle(document.getElementById("title").textContent);
                }}
              >
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
              <button className="closeForm" onClick={handleCloseFormClick}>
                <p>Cancel</p>
              </button>
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
                      Anon?
                      <p />
                    </h6>
                  </span>
                </label>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-12">
              <div className="preview-images" />
            </div>
          </div>
        </div>
      )}
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
                  <h3 className="ptitle">{post.title}</h3>
                  <br />
                  <div className="contents">{post.content}</div>
                  <br />
                  <br />
                  <div className="imgs">
                    {post.pictureUrl.length > 1 &&
                      post.pictureUrl.map((image, index) => (
                        <>
                          <button
                            onClick={() =>
                              imagePreview(index, postIndex, image)
                            }
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
                              onClick={() => handleCheckClose(index, postIndex)}
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
                          <button
                            onClick={() => imagePreview1(postIndex, image)}
                          >
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
                  {(post.postAnonymous !== "true" || admin == true) && (
                    <p className="usr">posted by {post.username}</p>
                  )}
                  <br />
                  <p className="postT">posted on {post.postingtime}</p>
                  <br />
                  <div className="likeContainer">
                    {likes.map((like, likeIndex) => (
                      <>
                        {like.postId === post._id &&
                          !(likeloads || likeload[likeIndex]) && (
                            <>
                              <form
                                onSubmit={(e) => sendLike("post", likeIndex, e)}
                                disabled={likeloads || likeload[likeIndex]}
                                key={likeIndex}
                              >
                                <input
                                  type="hidden"
                                  name="id"
                                  id="id"
                                  value={post._id}
                                />
                                <button
                                  className="likeBtn"
                                  type="submit"
                                  id={`like${post._id}`}
                                >
                                  {(() => {
                                    const likestatus = likestatuses.find(
                                      (likestatus) =>
                                        likestatus.postId === post._id &&
                                        likestatus.username === username,
                                    );
                                    return likestatus && likestatus.status ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="red"
                                        width={50}
                                        height={50}
                                        className="heart"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={50}
                                        className="heart"
                                        height={50}
                                        viewBox="0 0 512 512"
                                      >
                                        <path
                                          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                          fill="none"
                                          stroke="black"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={20}
                                        />
                                      </svg>
                                    );
                                  })()}
                                </button>
                              </form>
                              <p key={like.number} className="postlike">
                                {like.number}
                              </p>
                            </>
                          )}

                        {like.postId === post._id &&
                          (likeloads || likeload[likeIndex]) && (
                            <div className="likeLoad" key={post._id}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                width={50}
                                height={50}
                                className="loadHeart"
                                viewBox="0 0 512 512"
                              >
                                <path d="M256 448a32 32 0 01-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 009.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 01-18 5.56z" />
                              </svg>
                            </div>
                          )}
                      </>
                    ))}
                  </div>

                  {/* Comment Section */}
                  <button
                    onClick={() => handleComment(postIndex)}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={40}
                      height={40}
                    >
                      <path
                        fill="#374151"
                        strokeWidth={0.5}
                        d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
                      ></path>
                    </svg>
                    <p style={{ position: "relative", marginBottom: "0.5vh" }}>
                      Comments
                    </p>
                  </button>
                  {commentOpen[postIndex] && (
                    <>
                      <div className="commentForm">
                        <form
                          onSubmit={(e) => {
                            handleCommentSubmit(e);
                          }}
                          encType="multipart/form-data"
                        >
                          <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={post._id}
                          />
                          <div
                            contentEditable
                            required
                            id="comment"
                            name="comment"
                            style={{
                              borderBottomLeftRadius: !(commentDisplay || temp)
                                ? "5px"
                                : "0",
                              borderBottomRightRadius: !(commentDisplay || temp)
                                ? "5px"
                                : "0",
                              borderBottom:
                                commentDisplay || temp ? "none" : "",
                            }}
                            onInput={(e) => {
                              const value = e.target.textContent;
                              setCommentWords(
                                value.split(" ").filter((word) => word).length,
                              );
                            }}
                            onFocus={(e) => {
                              if (
                                e.target.textContent ===
                                "Comment on this post..."
                              ) {
                                e.target.textContent = "";
                                e.target.style.color = "black";
                              }
                              setCommentDisplay(true);
                            }}
                            onBlur={(e) => {
                              if (e.target.textContent === "") {
                                e.target.textContent =
                                  "Comment on this post...";
                                e.target.style.color = "gray";
                              }
                              setCommentDisplay(false);
                            }}
                          >
                            {comment === ""
                              ? "Comment on this post..."
                              : comment}
                          </div>
                          <div style={{ position: "relative" }}>
                            <span
                              style={{
                                position: "absolute",
                                fontSize: "0.85rem",
                                right: "0.7vw",
                                bottom: "0vh",
                              }}
                            >
                              {commentWords}
                            </span>
                          </div>
                          {/* This hr is not needed for now. */}
                          {/* <hr width="97%" style={{margin: "0 auto", marginBottom: "1vh"}}/> */}
                          {(commentDisplay || temp) && (
                            <div
                              tabIndex={0}
                              onMouseDown={() => setTemp(true)}
                              onBlur={() => setTemp(false)}
                            >
                              <label
                                className="picUpload"
                                htmlFor="input-files"
                                style={{
                                  borderRadius: "0",
                                  marginBottom: "0",
                                  textAlign: "center",
                                  fontWeight: "600",
                                }}
                              >
                                Pictures
                                <input
                                  type="file"
                                  id="input-files"
                                  className="form-control-file border"
                                  onChange={(e) =>
                                    setCommentFiles(e.target.files)
                                  }
                                  multiple
                                />
                              </label>
                              <div
                                onClick={() => setAnonymous(!anonymous)}
                                style={{
                                  backgroundColor: anonymous
                                    ? "#3AA138"
                                    : "#EF5C5C",
                                  color: "white",
                                  fontWeight: "600",
                                  textAlign: "center",
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                {anonymous ? "Anonymous" : "Not Anonymous"}
                              </div>
                              <button
                                type="submit"
                                className="postCommentBtn"
                                disabled={commentUploadLoad}
                                onClick={() => {
                                  setComment(
                                    document.getElementById("comment")
                                      .textContent,
                                  );
                                }}
                              >
                                {commentUploadLoad ? (
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
                                ) : (
                                  <p className="ldd">Post</p>
                                )}
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </>
                  )}

                  {/* picture upload svg (no need for now) */}
                  {/* <?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="149"	 height="132">
<path d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25
0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363
11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z
M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065
2.271,2.271,2.271h113.643c1.203,0,2.274-1.064
2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z
M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638
c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z
M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z"/>
</svg> */}

                  {/* loading state for comments (have not editted) */}
                  {/* Array.from({ length: 15 }).map((_, i) => (
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
              )) */}
                  <br />
                  {post.username === username && !admin && (
                    <div className="deleteForm">
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
                    </div>
                  )}
                  {admin && (
                    <div className="deleteForm">
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
                    </div>
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

export default Generalform;
