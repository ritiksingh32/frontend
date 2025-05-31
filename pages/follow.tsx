/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function FollowUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const follow = async () => {
    await api.post(`/users/${userId}/follow/${targetId}`);
    alert(`Followed successfully!`);
    setUserId("");
    setTargetId("");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Follow User</h1>

      <select
        className="w-full p-2 border rounded mb-4"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Who are you?</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded mb-4"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
      >
        <option value="">Who to follow?</option>
        {users.filter(u => u._id !== userId).map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button 
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={follow}
        disabled={!userId || !targetId}
      >
        Follow
      </button>
    </div>
  );
}