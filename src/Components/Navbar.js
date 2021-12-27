import { useState } from "react";
import "./Stylings/Navbar.css";

import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [navToggle, setNavToggle] = useState("closed");

  const handleNavToggle = () => {
    setNavToggle(navToggle === "closed" ? "open" : "closed");
  };

  return (
    <nav className="navbar">
      <p className="nav-brand">Typerless</p>
      <ul className={`nav-items ${navToggle}`}>
        <li className="nav-item ">
          <NavLink
            tag={Link}
            to="/"
            onClick={handleNavToggle}
            exact
            activeStyle={{ borderBottom: "2px solid var(--text-secondary)" }}
          >
            Practice
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/statistics"
            onClick={handleNavToggle}
            activeStyle={{ borderBottom: "2px solid var(--text-secondary)" }}
          >
            Statistics
          </NavLink>
        </li>
      </ul>
      <button className={`nav-btn ${navToggle}`} onClick={handleNavToggle}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navbar;
