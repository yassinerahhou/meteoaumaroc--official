import React from "react";
import Link from "next/link";
import Header_1 from "../components/Header-1";

const BrokenLinkPage: React.FC = () => {
  return (
    <>
      <Header_1 />
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 py-4">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Your Website Title</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-grow py-12 bg-gray-900">
          <div className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg text-center w-full max-w-md mx-auto">
            <h1 className="text-4xl font-extrabold mb-4">
              🚫 Page Not Available
            </h1>
            <p className="text-lg mb-6">
              We are working hard to bring this page to you. Please check back
              soon!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Return to Home
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Your Website Name. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BrokenLinkPage;
