import React, { useEffect, useState, useRef } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", {
        withCredentials: true,
      })
      .then((res) => {
        const cleaned = res.data.savedFoods
          .map((item) => item.food)
          .filter((f) => f && f.video);   

        setVideos(cleaned);
      });
  }, []);

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

  async function likeVideo(v) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: v._id },
      { withCredentials: true }
    );

    if (response.data.like) {
      setVideos((prev) =>
        prev.map((w) =>
          w._id === v._id ? { ...w, likeCount: (w.likeCount || 0) + 1 } : w
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((w) =>
          w._id === v._id ? { ...w, likeCount: (w.likeCount || 1) - 1 } : w
        )
      );
    }
  }

  async function bookmarkVideo(v) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: v._id },
      { withCredentials: true }
    );

    if (!response.data.save) {
      setVideos((prev) => prev.filter((x) => x._id !== v._id));
    }
  }

  return (
    <div className="reels-wrapper">
      <div className="reels-container" ref={containerRef}>
        {videos.length === 0 && (
          <p style={{ color: "white", textAlign: "center", marginTop: 40 }}>
            No saved reels yet
          </p>
        )}

        {videos
          .filter((v) => v && v.video)   
          .map((v, idx) => (
            <div className="reel" key={v._id}>
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={v.video}
                className="reel-video"
                muted
                playsInline
                loop
              />

              {/* RIGHT SIDE ICONS */}
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
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="action-count">0</span>
                  </div>
                </button>

                <button
                  onClick={() => bookmarkVideo(v)}
                  className="action-btn"
                >
                  <div className="action-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.5"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="action-count">
                      {v.savesCount ?? 0}
                    </span>
                  </div>
                </button>
              </div>

              {/* OVERLAY */}
              <div className="reel-overlay">
                <div className="reel-desc">{v.description}</div>
                <Link
                  className="reel-btn"
                  to={`/food-partner/${v.foodPartner}`}
                >
                  Visit Store
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <button onClick={() => navigate("/")}>
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

        <button>
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

export default Saved;
