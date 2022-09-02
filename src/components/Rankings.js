import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Crown from ".././images/crown0.png";
import BestX from "../../build/contracts/BestX.json";
import RankingImage from ".././images/rankingImage.png";
import { Link } from "react-router-dom";
import { bestxAddress } from "../../config-keys";

function Rankings() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadTop10Posts();
  }, []);

  async function loadTop10Posts() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
    const data = await bestx.fetchPostsByStatus(1); // could even get state from sibling by passing to parent first in explore component
    const items = await Promise.all(
      data.map(async (i) => {
        let item = {
          itemId: i[0].toNumber(),
          tokenUrl: i[1],
          votes: i[2].toNumber(),
          artist: i[3],
          status: i[4],
        };
        return item;
      })
    );
    setPosts(items);
  }

  // Closed Posts, sorted, descending
  const sortedPosts = posts?.sort((a, b) => b.votes - a.votes).slice(0, 10);
  console.log("sortedPosts", sortedPosts);

  const styles = {
    content: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: "#141413",
      padding: "27px",
    },
    title: {
      color: "white",
    },
    cardMargin: {
      margin: "0 17.5px",
    },
  };

  function openExploreModal0() {
    let rankingNavModalID1 = document.getElementById("rankingNavModalID1");
    let rankingNavModalSVGD1 = document.getElementById("rankingNavSVGD1");
    let rankingNavModalSVGU1 = document.getElementById("rankingNavSVGU1");
    let rankingNavModalID0 = document.getElementById("rankingNavModalID0");
    let rankingNavModalSVGD0 = document.getElementById("rankingNavSVGD0");
    let rankingNavModalSVGU0 = document.getElementById("rankingNavSVGU0");
    if (rankingNavModalID1.style.display === "block") {
      rankingNavModalID1.style.display = "";
      rankingNavModalSVGD1.classList.remove("hidden");
      rankingNavModalSVGU1.classList.add("hidden");
    }

    rankingNavModalID0.style.display === "block"
      ? (rankingNavModalID0.style.display = "")
      : (rankingNavModalID0.style.display = "block");
    rankingNavModalSVGD0.classList.contains("hidden")
      ? rankingNavModalSVGD0.classList.remove("hidden")
      : rankingNavModalSVGD0.classList.add("hidden");
    rankingNavModalSVGU0.classList.contains("hidden")
      ? rankingNavModalSVGU0.classList.remove("hidden")
      : rankingNavModalSVGU0.classList.add("hidden");
  }

  function openExploreModal1() {
    let rankingNavModalID1 = document.getElementById("rankingNavModalID1");
    let rankingNavModalSVGD1 = document.getElementById("rankingNavSVGD1");
    let rankingNavModalSVGU1 = document.getElementById("rankingNavSVGU1");
    let rankingNavModalID0 = document.getElementById("rankingNavModalID0");
    let rankingNavModalSVGD0 = document.getElementById("rankingNavSVGD0");
    let rankingNavModalSVGU0 = document.getElementById("rankingNavSVGU0");
    if (rankingNavModalID0.style.display === "block") {
      rankingNavModalID0.style.display = "";
      rankingNavModalSVGD0.classList.remove("hidden");
      rankingNavModalSVGU0.classList.add("hidden");
    }
    rankingNavModalID1.style.display === "block"
      ? (rankingNavModalID1.style.display = "")
      : (rankingNavModalID1.style.display = "block");
    rankingNavModalSVGD1.classList.contains("hidden")
      ? rankingNavModalSVGD1.classList.remove("hidden")
      : rankingNavModalSVGD1.classList.add("hidden");
    rankingNavModalSVGU1.classList.contains("hidden")
      ? rankingNavModalSVGU1.classList.remove("hidden")
      : rankingNavModalSVGU1.classList.add("hidden");
  }

  const renderContent = () => {
    let contentArray = [];
    if (sortedPosts) {
      sortedPosts.forEach((card, i) => {
        console.log(card)
        let cardMargin = i === 9 ? styles.cardMargin : null;
        contentArray.push(
          <div key={i}>
            <div className="rankingCard">
              <span style={cardMargin} className="rankingCardRank">
                {i + 1}
              </span>
              <span className="">
                <video className="imageCell rankingCell" muted>
                  <source src={card.tokenUrl} type="video/mp4" />
                </video>
              </span>
              <span className="rankingCardRank rankingCardRank0">{`${card.artist.slice(
                0,
                4
              )}...${card.artist.slice(-4)}`}</span>
              <span className="rankingCardRank">All Categories</span>
              <span className="rankingCardRank rankingCardRank1">
                {card.votes}
              </span>
              <span className="rankingCardRank2">
                <img className="rankingImage0" src={Crown} alt="" />
              </span>
            </div>
            <br />
          </div>
        );
      });
      return contentArray;
    }
  };

  return (
    <>
      <div style={styles.content} className="container">
        <br />
        <br />
        <br />
        <div>
          <h1>
            <strong style={styles.title}>RANKINGS</strong>
          </h1>
        </div>
        <div>
          <ul className="exploreNav">
            <li className="exploreNavList">
              <Link to="/Rankings" onClick={openExploreModal0}>
                ALL CATEGORIES
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="rankingNavSVGD0"
                  className="exploreChevron"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="rankingNavSVGU0"
                  className="exploreChevron hidden"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </Link>
            </li>
            <li className="exploreNavList">
              <Link to="/Rankings" onClick={openExploreModal1}>
                THIS WEEK
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="rankingNavSVGD1"
                  className="exploreChevron"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="rankingNavSVGU1"
                  className="exploreChevron hidden"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <form id="rankingNavModalID0" className="exploreNavModal">
            <div className="overlay"></div>
            <div className="rating">
              <input type="radio" name="rate" id="rate-1" value="1" disabled />
              <label>All Categories</label>

              <input type="radio" name="rate" id="rate-2" value="2" disabled />
              <label>Drum Solos</label>

              <input type="radio" name="rate" id="rate-3" value="3" disabled />
              <label>Guitar Riffs</label>

              <input type="radio" name="rate" id="rate-4" value="4" disabled />
              <label>Jazz Vocals</label>

              <input type="radio" name="rate" id="rate-5" value="5" disabled />
              <label>Rap Battle</label>
            </div>
            <hr className="exploreModalHr" />
            <br />
            <button
              className="exploreModalCancel"
              onClick={openExploreModal0}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </form>
        </div>
        <div>
          <form id="rankingNavModalID1" className="exploreNavModal modalShift1">
            <div className="overlay"></div>
            <div className="rating">
              <input type="radio" name="rate" id="rate-1" value="1" disabled />
              <label>This week</label>

              <input type="radio" name="rate" id="rate-2" value="2" disabled />
              <label>Last week</label>

              <input type="radio" name="rate" id="rate-3" value="3" disabled />
              <label>All time</label>
            </div>
            <hr className="exploreModalHr" />
            <br />
            <button
              className="exploreModalCancel"
              onClick={openExploreModal1}
              type="button"
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </form>
        </div>
        <br />
        <div className="rankingCardContainer">{renderContent()}</div>
      </div>
    </>
  );
}

export default Rankings;
