"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const notify = () => toast("Signed up successfully.");
  const notifyError = (message: any) =>
    toast.error(`Signup failed: ${message}`);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("response: ", response.data);
      notify();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      console.log("signup failed", error);
      notifyError(error.response?.data?.error);
    } finally {
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Sign up</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        className="p-2 border border-gray-300
rounded-lg mb-4 focus:outline-none
focus:border-gray-600"
        onClick={onSignup}
      >
        {buttonDisabled ? "No sign up" : "Sign up"}
      </button>
      <Link href="/login">Visit Login</Link>
      <Toaster />
    </div>
  );
}
