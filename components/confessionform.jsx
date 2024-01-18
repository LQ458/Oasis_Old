"use client";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import styles from "../app/src/confession.scss";
import loveWords from "../app/src/loveWords.json";

export default function Confessionform({ username }) {
  const [toWho, setToWho] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [hidden, setHidden] = useState(true); // [TODO] change to false when done testing
  const [anonymous, setAnonymous] = useState(true);
  const [cn, setCn] = useState("");
  const [en, setEn] = useState("");

  useEffect(() => {
    const loveWordsArray = Object.values(loveWords);
    const randomIndex = Math.floor(Math.random() * loveWordsArray.length);
    setCn(loveWordsArray[randomIndex].CN);
    setEn(loveWordsArray[randomIndex].EN);
  }, []);

  const getLove = async () => {
    try {
      const response = await axios.get("/api/fetchLove");
      const loveforms = response.data.loveforms;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLove = async () => {
      await getLove();
    };

    fetchLove();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/fetchLove", {
        username,
        toWho,
        nickname,
        content,
        anonymous,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openForm = () => {
    setHidden(false);
  };
  const closeForm = () => {
    setHidden(true);
  };

  return (
    <body className="loveBg">
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <div className="loveSentence">{cn} {en}</div>
      <button className="openFormBtn" onClick={() => openForm()}>
        Express your love
      </button>
      {hidden ? (
        false
      ) : (
        <form
          className="loveForm"
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <button className="closeFormBtn" onClick={() => closeForm()}>
            X
          </button>
          <input
            type="text"
            name="toWho"
            required
            placeholder="To who?"
            value={toWho}
            onChange={(e) => setToWho(e.target.value)}
          />
          <input
            type="text"
            name="nickname"
            placeholder="Your nickname?"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Your confession?"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="checkbox"
            name="anonymous"
            value={anonymous}
            onChange={(e) => setAnonymous(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </body>
  );
}
