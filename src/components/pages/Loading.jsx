import React from "react";

function Loading({ message }) {
  return (
    <div>
        <h1 className="text-center text-3xl font-extrabold">{message}</h1>
      <div className="flex justify-center items-center h-screen overflow-hidden">
        <div className="loader relative flex justify-center items-center h-[9em] w-[9em]">
          <div className="circle white"></div>
          <div className="circle red"></div>
          <div className="circle orange"></div>
          <div className="circle yellow"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
