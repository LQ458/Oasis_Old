"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/app/src/discussion.css";

export default function DiscussionForm({ admin, username }) {
  const [mainTopics, setMainTopics] = useState([]);
  const [subTopics, setSubTopics] = useState([]);
  const [mainTopic, setMainTopic] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [error, setError] = useState(false);

  const getTopics = async () => {
    try {
      setTopicLoading(true);
      const res = await axios.get("/api/fetchTopics");
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
  }, []);

  useEffect(() => {
    if (mainTopics.length > 0) {
      const randomIndex = Math.floor(Math.random() * mainTopics.length);
      setMainTopic(mainTopics[randomIndex]);
    }
  }, [mainTopics]);

  return (
    <>
      <div className="discussionTopBar">
      {mainTopic && (
          <h1 className="discussion">{mainTopic.title}</h1>
      )}
      </div>
      <h1 className="discussion">Hiii</h1>
    </>
  );
}
