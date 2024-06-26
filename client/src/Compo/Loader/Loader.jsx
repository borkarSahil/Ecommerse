import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LoaderDiv = () => {
  const [cnt, setCnt] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCnt((prevVal) => --prevVal);
    }, 1000);
    cnt === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [cnt, navigate]);
  return (
    <div className="data-loader">
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const LoaderStyles = `
  .data-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    margin-top: -26px;
    text-align: center;
    padding: 2px;
  }

  .data-loader > div:last-child {
    position: relative;
    width: 80px;
    height: 15px;
    margin: 1em auto;
  }

  .data-loader > div:last-child > div {
    position: absolute;
    top: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #000;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .data-loader > div:last-child > div:nth-child(1) {
    left: 8px;
    animation: data-loader-1 0.6s infinite;
  }

  .data-loader > div:last-child > div:nth-child(2) {
    left: 8px;
    animation: data-loader-2 0.6s infinite;
  }

  .data-loader > div:last-child > div:nth-child(3) {
    left: 32px;
    animation: data-loader-2 0.6s infinite;
  }

  .data-loader > div:last-child > div:nth-child(4) {
    left: 56px;
    animation: data-loader-3 0.6s infinite;
  }

  @keyframes data-loader-1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes data-loader-2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  @keyframes data-loader-3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

const Loader = () => (
  <>
    <style>{LoaderStyles}</style>
    <LoaderDiv />
  </>
);

export default Loader;
