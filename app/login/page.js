/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import Image from "next/image";
// import GoogleSignIn from "../components/Buttons/GoogleSignIn";
import app from "@/utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Head from "next/head";

// import { Result } from "postcss";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Add this line to import useRouter

  // const auth = getAuth(app);

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
      ); // Pass auth instance
      router.push("/dashboard");
      // User is logged in, you can redirect or perform other actions
    } catch (error) {
      setError(error);
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to the dashboard
        router.push("/dashboard");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  });

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
              // placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            />
          </div>
          <div>
            <label className="font-medium dark:text-white">Password</label>
            <input
              // type="password"
              // placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            />
          </div>
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
            {/* <Link
              href="/forgot-password"
              className="text-center text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link> */}
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
