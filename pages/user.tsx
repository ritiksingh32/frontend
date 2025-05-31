import { useState } from "react";
import { api } from "../services/api";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [newUserId, setNewUserId] = useState("");

  const createUser = async () => {
    const res = await api.post("/users", { name });
    setNewUserId(res.data._id);
    setName("");
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create User</h1>
      <input
        type="text"
        placeholder="Enter name"
        className="w-full p-2 border rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={createUser}
        disabled={!name}
      >
        Create User
      </button>

      {newUserId && (
        <div className="mt-4 p-3 bg-gray-100 rounded break-all">
          <p>User ID: <strong>{newUserId}</strong></p>
          <p className="text-sm text-gray-600">Copy this for testing</p>
        </div>
      )}
    </div>
  );
}