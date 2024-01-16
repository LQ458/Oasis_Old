"use client";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import styles from "../app/src/confession.scss";

export default function Confessionform() {
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

  return (
    <body className="loveBg">
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </body>
  );
}
