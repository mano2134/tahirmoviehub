import { useState, useRef, useEffect, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getMovieData } from "../../Api/omdb";
import MovieCards from "../UI/MovieCards";
import { toast } from "react-toastify";
import fadeInUp, { fadeDown } from "../Animation/FadeInUp";

const Home = ({ MovieArr, setMovieArr }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cardsRef = useRef(null);

  const getMovieDataFromApi = async () => {
    try {
      const res = await getMovieData(inputValue);
      if (res.data.Response === "True") {
        startTransition(() => {
          setMovieArr(res.data.Search);
        });
      } else {
        toast.warn(`${inputValue} not found`, {
          className: "toast-not-found",
          toastId: "not-found-toast",
          onClose: () => setIsTyping(false),
        });
        setIsTyping(true);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const HandleshowMove = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      getMovieDataFromApi();
      setInputValue("");
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(MovieArr) && MovieArr.length > 0) {
      cardsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [MovieArr]);

  useEffect(() => {
    isPending ? setIsTyping(true) : setIsTyping(false);
  }, [isPending]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="animate-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        <div className="container">
          <motion.h1
            className="title"
            variants={fadeDown(0.8)}
            initial="hidden"
            animate="visible"
          >
            Discover A Movie
          </motion.h1>
          <motion.p
            className="subtitle"
            variants={fadeDown(1.2)}
            initial="hidden"
            animate="visible"
          >
            Find the perfect movie for your mood from thousands of titles —
            stream instantly and enjoy a world of entertainment.
          </motion.p>

          {isPending && <div className="loader"></div>}

          {/* Search Form */}
          <motion.form
            className="search-form"
            onSubmit={HandleshowMove}
            variants={fadeInUp(1.4)}
            initial="hidden"
            animate="visible"
          >
            <input
              type="text"
              name="SearchMovie"
              placeholder="Search Your Movie"
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              value={inputValue}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Search"}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Movie Cards Grid */}
      {Array.isArray(MovieArr) && MovieArr.length > 0 && (
        <motion.div
          ref={cardsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "circInOut" }}
        >
          <MovieCards MovieArr={MovieArr} />
        </motion.div>
      )}
    </>
  );
};

export default Home;
