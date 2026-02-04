import React, { useState, useRef, useEffect } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
            vid.currentTime = 0;
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        const updated = res.data.foodItems.map((v) => {
          const savedLike = localStorage.getItem(`like_${v._id}`);
          const savedSave = localStorage.getItem(`save_${v._id}`);

          return {
            ...v,
            likeCount:
              savedLike !== null
                ? Number(savedLike)
                : v.likeCount > 0
                ? 1
                : 0,
            savesCount:
              savedSave !== null
                ? Number(savedSave)
                : v.savesCount > 0
                ? 1
                : 0,
          };
        });

        setVideos(updated);
      });
  }, []);

  async function likeVideo(v) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: v._id },
      { withCredentials: true }
    );

    const nextValue = response.data.like ? 1 : 0;
    localStorage.setItem(`like_${v._id}`, nextValue);

    setVideos((prev) =>
      prev.map((w) =>
        w._id === v._id ? { ...w, likeCount: nextValue } : w
      )
    );
  }

  async function bookmarkVideo(v) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: v._id },
      { withCredentials: true }
    );

    const nextValue = response.data.save ? 1 : 0;
    localStorage.setItem(`save_${v._id}`, nextValue);

    setVideos((prev) =>
      prev.map((w) =>
        w._id === v._id ? { ...w, savesCount: nextValue } : w
      )
    );
  }

  return (
    <div className="reels-wrapper">
      <div className="reels-container" ref={containerRef}>
        {videos.map((v, idx) => (
          <div className="reel" key={v._id}>
            <video
              ref={(el) => (videoRefs.current[idx] = el)}
              src={v.video}
              className="reel-video"
              muted
              playsInline
              loop
            />

            <div className="reel-actions">
              <button onClick={() => likeVideo(v)} className="action-btn">
                <div className="action-inner">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  <span className="action-count">
                    {v.likeCount ?? 0}
                  </span>
                </div>
              </button>

              <button className="action-btn">
                <div className="action-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#ffffff"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" />
                  </svg>
                  <span className="action-count">0</span>
                </div>
              </button>

              <button className="action-btn" onClick={() => bookmarkVideo(v)}>
                <div className="action-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#ffffff"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z" />
                  </svg>
                  <span className="action-count">
                    {v.savesCount ?? 0}
                  </span>
                </div>
              </button>
            </div>

            <div className="reel-overlay">
              <div className="reel-desc">{v.description}</div>
              <Link className="reel-btn" to={`/food-partner/${v.foodPartner}`}>
                Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <button  onClick={() => navigate("/reels", { replace: true })}>
          <span>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
              />
            </svg>
          </span>
          <small>Home</small>
        </button>

        <button onClick={() => navigate("/saved")}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#ffffff"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z" />
            </svg>
          </span>
          <small>Saved</small>
        </button>
      </div>
    </div>
  );
};

export default Home;
