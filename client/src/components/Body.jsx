import { useState, useRef } from "react";
import Summary from "./Summary";
// import { spawn } from "child_process";

const Body = () => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadingSpinnerRef = useRef(loading);

  const validateInput = () => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;

    if (!regex.test(input)) {
      setErrorMessage("Please enter a valid YouTube video link.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (validateInput()) {
      setLoading(true);
      loadingSpinnerRef.current.classList.remove("hidden");
      // Perform the rest of your logic here
      //call the python model and run
      try {
        // const spawn = require("child_process").spawn;
        const spawn = await import('child_process');

        const pythonProcess = spawn('python',["../youtubeSum.py"]);
        pythonProcess.stdout.on('data', (data) => {
          console.log(data.toString());
        });

      } catch (error) {
        console.log(error)
        setErrorMessage(error.message);
      }
    }
   
  };

  return (
    <>
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white-900 md:text-5xl lg:text-6xl dark:text-white">
          Youtube Video Summarizer
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-white-800">
          The Youtube video summarizer website is a tool that allows users to
          automatically create a summary of Youtube videos. Users can simply
          enter the video URL and obtain a text document that summarizes the
          important points of the video. This helps users save time and quickly
          understand the videos
        </p>
        <br />
        <form
          method="post"
          id="myForm"
          className="flex flex-wrap justify-center items-center px-12"
          onSubmit={handleSubmit}
        >
          <div className="relative rounded-md flex-grow-1 max-w-lg mx-7">
            <input
              type="text"
              id="input"
              name="input"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full py-2 px-12 pr-20 rounded-md bg-gray-600 border-2 border-gray-600 focus:border-blue-800 focus:outline-none"
            />
            <select
              id="language-select"
              name="selectedLanguage"
              className="text-white bg-gray-600 absolute inset-y-0 right-0 py-3/2 px-1 rounded-md focus:outline-none"
            >
              <option value="en">English</option>
              <option value="tr">Turkish</option>
              <option value="hi">Hindi</option>
              <option value="pt">Portuguese</option>
              <option value="fil">Filipino</option>
              <option value="de">German</option>
              <option value="fr">French</option>
              <option value="id">Indonesian</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg
                className="h-6 w-6 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M22.5 21L16.8 15.3C18.3 13.5 19.2 11.3 19.2 9C19.2 4.5 15.5 0.75 11 0.75C6.5 0.75 2.75 4.5 2.75 9C2.75 13.5 6.5 17.25 11 17.25C13.1 17.25 15.1 16.35 16.8 15.3L22.5 21ZM11 15C8.25 15 6 12.75 6 10C6 7.25 8.25 5 11 5C13.75 5 16 7.25 16 10C16 12.75 13.75 15 11 15Z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            id="submit-btn"
            className="py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4"
          >
            Summarize
          </button>
        </form>

        {/* Error Message */}
        <div className="flex items-center justify-center">
          <div id="error-message" className="text-red-600 font-bold p-4">
            {errorMessage}
          </div>
        </div>

        {/* Loading Spinner */}
        <div
          id="loading-spinner"
          ref={loadingSpinnerRef}
          className={`hidden flex items-center justify-center fixed inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-75`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>

      {/* summary boxes */}
      <Summary />
    </>
  );
};

export default Body;
