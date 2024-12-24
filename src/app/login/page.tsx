"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const notify = () => toast("logged in successfully.");
  const notifyError = (message: any) => toast.error(`Login failed: ${message}`);
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("response: ", response.data);
      notify();
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      console.log("login failed", error);
      notifyError(error.response?.data?.error);
    } finally {
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600  text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600  text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300
rounded-lg mb-4 focus:outline-none
focus:border-gray-600"
      >
        Login
      </button>
      <Link href="/signup">Visit Signup</Link>
      <Toaster />
    </div>
  );
}
