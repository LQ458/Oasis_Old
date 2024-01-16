"use client";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import styles from "../app/src/confession.scss";

export default function Confessionform({username}) {
  const [toWho, setToWho] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const getLove = async () => {
    try{
      const response = await axios.get("/api/fetchLove");
      const loveforms = response.data.loveforms;
    }catch(error){
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
    try{
      const response = await axios.post("/api/fetchLove", {
        username,
        toWho,
        nickname,
        content,
        anonymous,
      });
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <body className="loveBg">
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <form className="loveForm" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <input type="text" name="toWho" required placeholder="To who?" value={toWho} onChange={(e) => setToWho(e.target.value)} />
        <input type="text" name="nickname" placeholder="Your nickname?" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <textarea name="content" placeholder="Your confession?" required value={content} onChange={(e) => setContent(e.target.value)} />
        <input type="checkbox" name="anonymous" value={anonymous} onChange={(e) => setAnonymous(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </body>
  );
}
