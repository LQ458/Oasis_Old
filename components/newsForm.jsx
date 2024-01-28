"use client";
import React from "react";
import { useState, useEffect } from "react";

const NewsForm = (admin, username) => {
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/fetchNews");
      setNews(res.data.posts);
    } catch (error) {
      console.log("Error fetching news", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [])

  const [news, setNews] = useState([]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>News</h1>
            <p>Here you can find all the latest news about the server.</p>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">News</h5>
                <p className="card-text">
                  {news.map((post) => (
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                    </div>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
