"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/src/discussion.css";

export default function DiscussionForm({ admin, username }) {
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);
  const [topicLoading, setTopicLoading] = useState(false);
  const [error, setError] = useState(false);

  const getTopics = async () => {
    try {
      setTopicLoading(true);
      const res = axios.get("/api/fetchTopics");
      setMainTopics(res.data.mainTopics);
      setSubTopics(res.data.subTopics);
      setTopicLoading(false);
    } catch (error) {
      setTopicLoading(false);
      setError(true);
      console.log("Error loading topics", error);
    }
  };

  useEffect(() => {
    getTopics();
    const randomIndex = Math.floor(Math.random() * mainTopics.length);
  }, []);

  return (
    <>
      <div className="discussionTopBar"></div>
    </>
  );
}
