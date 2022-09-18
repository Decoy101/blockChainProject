import React from "react";
import { Link } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div>
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                <img alt="" src={BESTX} />
              </Link>
            </div>

            <div className="flex justify-between items-center">
              <ul className="footer-links">
                <li>
                  <Link to="/About" className="elementFooterStyling">About Us</Link>
                </li>
                <li>
                  <Link to="/FAQs" className="elementFooterStyling">FAQs</Link>
                </li>
              </ul>
              <p className="elementFooterStyling">|</p>
              <ul className="footer-links">
                <li>
                  <a href="https://twitter.com/BestX_DAO" target="_blank" rel="noreferrer">
                    <FaTwitter className="elementFooterStyling" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/U3YSa8pj" target="_blank" rel="noreferrer">
                    <FaDiscord className="elementFooterStyling" />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <FaTelegram className="elementFooterStyling" />
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <br />

        <div>
          <div>
            <p>
              All rights reserved, BestX, 2022
              <span className="mx-8">|</span>
              <Link to="/About" className="elementFooterStyling">Terms of Service</Link>
              <Link to="/About" className="elementFooterStyling">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
