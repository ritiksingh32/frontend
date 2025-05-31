import { useState } from "react";
import { api } from "../services/api";

export default function CreatePost() {
  const [authorId, setAuthorId] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await api.post("/posts", { content, author: authorId });
    alert("Post created and notification queued");
  };

  return (
    <div  className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>
      <input
        className="border p-2 m-2"
        placeholder="Author ID"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      />
      <textarea
         className="w-full p-2 border rounded mb-4"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700" onClick={submit}>
        Post
      </button>
    </div>
  );
}
