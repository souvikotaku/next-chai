"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const notify = () => toast("Logged out successfully.");
  const notifyError = (message: any) =>
    toast.error(`Logout failed: ${message}`);
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("response: ", response.data);
      router.push("/login");
      setTimeout(() => {
        notify();
      }, 500);
    } catch (error: any) {
      console.log("login failed", error);
      notifyError(error.response?.data?.error);
    } finally {
    }
  };
  return (
    <div
      className="flex flex-col
justify-center min-h-screen py-2
items-center"
    >
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <button
        onClick={onLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <Toaster />
    </div>
  );
}
