import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { ToastContainer, toast, Flip } from "react-toastify";

const MovieCards = ({ MovieArr }) => {
  const [addToLocalStorage, setAddToLocalStorage] = useState(() => {
    const existingData = localStorage.getItem("movieKey");
    return existingData ? JSON.parse(existingData) : [];
  });

  const hanleAddLocalStorage = (movie) => {
    setAddToLocalStorage((prev) => {
      const alreadyExists = prev.some((m) => m.imdbID === movie.imdbID);
      if (!alreadyExists) {
        toast.success("Added to Watchlists", {
          className: "progess-toast",
          autoClose: 200,
          hideProgressBar: true,
        });
        return [...prev, movie];
      } else {
        toast.info("Already added", {
          className: "progess-toast",
          autoClose: 200,
          hideProgressBar: true,
          progress: undefined,
        });
      }
      return prev;
    });
  };

  useEffect(() => {
    localStorage.setItem("movieKey", JSON.stringify(addToLocalStorage));
  }, [addToLocalStorage]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <div className="card-wrapper">
        <div className="container card-grid">
          {MovieArr.map((curMovie, index) => {
            return (
              <motion.div
                // className="card"
                key={curMovie.imdbID}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              >
                {/* Poster */}
                
                  <div className="card">
                    <NavLink  to={`/${curMovie.imdbID}`}>
                    <div className="poster-container">
                    <img
                      src={
                        curMovie.Poster === "N/A"
                          ? "https://th.bing.com/th/id/OIP.KXgJyHaCDLqnq6F7_ekL5gHaJ4?w=147&h=197&c=7&r=0&o=7&pid=1.7&rm=3"
                          : curMovie.Poster
                      }
                      alt="Movie Poster"
                      className="poster"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://th.bing.com/th/id/OIP.KXgJyHaCDLqnq6F7_ekL5gHaJ4?w=147&h=197&c=7&r=0&o=7&pid=1.7&rm=3";
                      }}
                    />
                  </div>
                  </NavLink>

                  {/* Info */}
                  <div className="info">
                    <h3 className="title">{curMovie.Title}</h3>
                    <p className="year">{curMovie.Year}</p>
                    <button
                      className="btn"
                      onClick={() => hanleAddLocalStorage(curMovie)}
                    >
                      + Add to Watchlist
                    </button>
                  </div>
                  </div>
                
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MovieCards;
