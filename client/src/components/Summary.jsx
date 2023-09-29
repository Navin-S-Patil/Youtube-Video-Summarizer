import { useState } from "react";

function Summary(props) {
  const copyText = (id, myTooltip) => {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text);
    const tooltip = document.getElementById(myTooltip);
    tooltip.innerHTML = "Copied!";
  };

  const [text, setText] = useState(props.text);

  return (
    <>
      {/* summary boxes */}
      <div className="container mx-auto px-6 py-4">
        <p className="p-3">
          Summarized text is of length {text[1]} from the original length{" "}
          {text[0].length}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black rounded-md">
            <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-s font-sans justify-between rounded-t-md">
              <span>Full Subtitle View</span>
              <button
                className="tooltip"
                style={{ background: "transparent", color: "white" }}
                onClick={() => copyText("longsub", "myTooltip1")}
              >
                <i className="fa-solid fa-copy"></i>
                <span
                  className="tooltiptext"
                  id="myTooltip1"
                  style={{ backgroundColor: "#404040", color: "white" }}
                >
                  Copy to clipboard
                </span>
              </button>
            </div>
            <div className="bg-gray-900 p-4 overflow-y-scroll h-64 border-2 border-black">
              <p id="longsub" className="text-white text-sm">
                {text[0]}
              </p>
            </div>
          </div>

          <div className="bg-black rounded-md">
            <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-s font-sans justify-between rounded-t-md">
              <span>The Most Important Parts of the Video</span>
              <button
                className="tooltip"
                style={{ background: "transparent", color: "white" }}
                onClick={() => copyText("summary", "myTooltip2")}
              >
                <i className="fa-solid fa-copy"></i>
                <span
                  className="tooltiptext"
                  id="myTooltip2"
                  style={{ backgroundColor: "#404040", color: "white" }}
                >
                  Copy to clipboard
                </span>
              </button>
            </div>
            <div className="bg-gray-900 p-4 rounded-l-lg overflow-y-scroll h-64 border-2 border-black hover:border-green-300 transition-all duration-300">
              <p id="summary" className="text-white text-sm mb-4">
                {text[2]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* display video */}
      {/* <iframe
        src={props.link}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      /> */}
    </>
  );
}

export default Summary;
