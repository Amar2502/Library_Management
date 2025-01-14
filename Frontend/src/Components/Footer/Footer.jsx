import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 md:py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-xs sm:text-sm md:text-base">
          <a
            href="mailto:contact@amarpandey.com"
            className="hover:text-gray-400"
          >
            Contact
          </a>{" "}
          | Made by <span className="font-bold">Amar Pandey</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
