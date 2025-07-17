import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          className="header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="header-container">
            <h1 className="logo">CineScope</h1>

            {/* Hamburger Icon */}
            <div
              className={`hamburger-button ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                className="bar"
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="bar"
                animate={{
                  opacity: menuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="bar"
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Desktop Nav */}
            <nav className="nav-desktop">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/watchLists">WatchLists</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </nav>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                className="nav-mobile"
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -200, opacity: 0 }}
                transition={{ duration: 0.5, ease:"circInOut"}}
              >
                <NavLink onClick={() => setMenuOpen(false)} to="/">
                  Home
                </NavLink>
                <NavLink onClick={() => setMenuOpen(false)} to="/watchLists">
                  WatchLists
                </NavLink>
                <NavLink onClick={() => setMenuOpen(false)} to="/about">
                  About
                </NavLink>
                <NavLink onClick={() => setMenuOpen(false)} to="/contact">
                  Contact Us
                </NavLink>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
