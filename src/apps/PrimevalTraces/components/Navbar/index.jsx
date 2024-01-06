import { FaSearch } from "react-icons/fa";

import "./style.scss";

const PrimevalNavbar = () => {
  return (
    <div className="primeval-navbar">
      <div className="primeval-navbar-brand-container">
        <a href="/" className="primeval-navbar-brand">
          Primeval Traces
        </a>
        <span className="primeval-navbar-brand-subtitle">Fossil Finder by James Hinton</span>
      </div>
      <div className="primeval-navbar-search">
        <FaSearch />
      </div>
    </div>
  );
};

export default PrimevalNavbar;
