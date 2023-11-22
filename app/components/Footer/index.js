// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-300 p-4 text-center">
      <p>
        Design and developed by{" "}
        <a
          href="https://www.kspdigitalsolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          kspdigitalsolutions
        </a>{" "}
        &amp;{" "}
        <a
          href="https://www.kspelectronics.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Kspelectronics
        </a>
      </p>
    </footer>
  );
};

export default Footer;
