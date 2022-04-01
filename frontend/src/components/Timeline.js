import React, { useState, useEffect } from "react";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
  const response = await fetch(
      "http://localhost:3001/api/user/11"
    );
   const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="App">
    <p> {posts.value} </p>
      <button onClick={fetchPost}> get new joke </button>
    </div>
  );
}