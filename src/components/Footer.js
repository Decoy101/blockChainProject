import React from "react";
import { Link } from "react-router-dom";
import BESTX from "../media/BestX.svg";
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Link to="/">
                <img alt="" src={BESTX} />
              </Link>
              <br />
              <br />
              <p className="text-justify">
                BextX is a game that rewards musicians for creating quality
                content - and allows fans to contribute to and share in their
                success.
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>The Company</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/About" className="elementFooterStyling">About Us</Link>
                </li>
                <li>
                  <Link to="/FAQs" className="elementFooterStyling">FAQs</Link>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Contact</h6>
              <ul className="footer-links">
                <li>
                  <a href="https://twitter.com/BestX_DAO" target="_blank">
                    <FaTwitter className="elementFooterStyling" />
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/U3YSa8pj" target="_blank">
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
          <hr />
        </div>

        <div>
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <span className="copyright-span">
                All rights reserved, BestX, 2022
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
