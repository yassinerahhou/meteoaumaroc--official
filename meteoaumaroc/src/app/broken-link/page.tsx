import React from "react";
import Link from "next/link";

const BrokenLinkPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-grow py-12 bg-gray-900">
          <div className="bg-gray-800 bg-opacity-90 p-10 rounded-lg shadow-lg text-center">
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
      </div>
    </>
  );
};

export default BrokenLinkPage;
