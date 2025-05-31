import {useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    const res = await api.get(`/notifications/${userId}`);
    console.log("API response:", res.data);
    setNotifications(res.data);
  };

  return (
    <div className="p-5">
      <h1>Your Notifications</h1>
      <input
        className="border p-2 m-2"
        placeholder="Enter Your User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={fetchNotifications}>
        Fetch Notifications
      </button>

      <ul className="mt-4">
        {notifications.map((n) => (
          <li key={n._id} className="border-b py-2">
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
// 6839d2068a1c12fa20c0a999