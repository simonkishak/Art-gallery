import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <div className="container">
        <a className="navbar-brand">Artworld </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <button className="btn nav-btn btn-outline-primary">
                Balance:{props.balance} cUSD
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
