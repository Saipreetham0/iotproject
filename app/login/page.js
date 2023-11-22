/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import app from "@/utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/dashboard");
    } catch (error) {
      // Handle specific error cases
      if (error.code === "auth/user-not-found") {
        setError("User not found. Check your email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <Head>
        <title>NeoVest SignIn</title>
      </Head>
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-white">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-medium dark:text-white ">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            />
          </div>
          <div>
            <label className="font-medium dark:text-white">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                id="remember-me-checkbox"
                className="checkbox-item peer hidden"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <label
                htmlFor="remember-me-checkbox"
                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 dark:text-white"
              />
              <span className="dark:text-white">Remember me</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
