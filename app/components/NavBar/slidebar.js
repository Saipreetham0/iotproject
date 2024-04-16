// layouts/Dashboard1Layout.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeButton from "../NavBar/Theme";

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
// import { useAuth } from "../../../context/AuthContext";

const MenuItems = [
  {
    link: "/dashboard",
    icon: (
      <svg
        class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
    name: "Dashboard",
  },

  {
    link: "/data",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
          clip-rule="evenodd"
        />
      </svg>
    ),
    name: "Data",
  },

  // {
  //   link: "/device",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 20 20"
  //       fill="currentColor"
  //       class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  //     >
  //       <path
  //         fill-rule="evenodd"
  //         d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
  //         clip-rule="evenodd"
  //       />
  //     </svg>
  //   ),
  //   name: "Device",
  // },

  {
    link: "/images",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
          clip-rule="evenodd"
        />
      </svg>
    ),
    name: "Images",
  },
];

const logOutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
    />
  </svg>
);

const Sidebar = () => {
  //   const { signOut } = useAuth();
  const router = useRouter(); // Import the useRouter hook

  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/closed
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State for user dropdown open/closed

  // const { signOut } = useAuth(); // Replace useAuth with your actual authentication hook

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut(); // Use Firebase's signOut method
      router.push("/login"); // Redirect after successful logout
    } catch (error) {
      console.error("Error during logout:", error.message);
      // Handle errors if needed
    }
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-width="2"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="/dashboard" class="flex ml-2 md:mr-24">
                {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" /> */}
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  IOT Project
                </span>
              </Link>
            </div>

            <div class="flex ">
              <ThemeButton />

              <div class="flex items-center">
                <div class="flex items-center ml-3">
                  <div>
                    {/* <button
                      type="button"
                      onClick={toggleUserDropdown}
                      class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span class="sr-only">Open user menu</span>
                      <Image
                        class="w-8 h-8 rounded-full"
                        src=""
                        alt="user photo"
                      />
                    </button> */}
                  </div>
                  <div
                    class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        Neil Sims
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        // class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {MenuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  onClick={toggleSidebar}
                  // className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    router.pathname === item.link
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {item.icon}

                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                onClick={handleLogOut}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {logOutIcon}
                <span className="ml-3">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
