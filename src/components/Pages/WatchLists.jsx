import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "motion/react";
import fadeInUp from "../Animation/FadeInUp";
import { NavLink } from "react-router"; 

const WatchLists = () => {
  const [dataOfLs, setDataOfLs] = useState(() => {
    const storedData = localStorage.getItem("movieKey");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [parent] = useAutoAnimate(); // Hook for smooth layout after delete

  const handleRemove = (imdbID) => {
    const updatedList = dataOfLs.filter((movie) => movie.imdbID !== imdbID);
    setDataOfLs(updatedList);
    localStorage.setItem("movieKey", JSON.stringify(updatedList));
  };

  return (
    <div className="watch-lists">
      <div className="container">
        <motion.h2
          className="watchlist-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
        >
          🎬 My WatchList
        </motion.h2>

        <div className="movie-grid" ref={parent}>
          {dataOfLs.length > 0 ? (
            dataOfLs.map((curElem) => (
              <motion.div
                className="movie-card"
                key={curElem.imdbID}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1 }}
              >
                {/* <NavLink to={`/${curElem.imdbID}`}> */}
                <img
                  className="movie-image"
                  src={
                    curElem.Poster === "N/A"
                      ? "https://th.bing.com/th/id/OIP.KXgJyHaCDLqnq6F7_ekL5gHaJ4?w=147&h=197&c=7&r=0&o=7&pid=1.7&rm=3"
                      : curElem.Poster
                  }
                  alt="Movie Poster"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://th.bing.com/th/id/OIP.KXgJyHaCDLqnq6F7_ekL5gHaJ4?w=147&h=197&c=7&r=0&o=7&pid=1.7&rm=3";
                  }}
                />
                {/* </NavLink> */}
                <h3>{curElem.Title}</h3>
                <p>📅 {curElem.Year}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(curElem.imdbID)}
                >
                  ❌ Remove
                </button>
              </motion.div>
            ))
          ) : (
            <div className="empty-message">
              <motion.p
                variants={fadeInUp(0.9)}
                initial="hidden"
                animate="visible"
              >
                Your <span>WatchList is empty!</span> Start adding some movies 🎞️
              </motion.p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLists;
