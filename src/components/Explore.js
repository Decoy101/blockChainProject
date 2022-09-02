import React, { useEffect, useState } from "react";
import CreatorImage from ".././images/creatorImage.png";
import { Link } from "react-router-dom";
import ShowModal from "./ShowModal";
// import { exploreData } from ".././data/exploreData";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import AlmostGilmour from '.././images/almost_gilmour.svg';
// import BlackWhite from '.././images/black&white.svg';
import Crown from ".././images/crown.png";
import BestX from "../../build/contracts/BestX.json";
import { bestxAddress } from "../../config-keys";
import { FaUser } from "react-icons/fa";

// console.log(exploreData)

function Explore({
  contract,
  setContract,
  web3Modal,
  setWeb3Modal,
  connected,
  setConnected,
}) {
  const [posts, setPosts] = useState([]);
  const [showSrc, setShowSrc] = useState();
  const [showArtist, setShowArtist] = useState();
  const [showArtist0, setShowArtist0] = useState();
  const [cardItemId, setCardItemId] = useState();
  const [cardDescription, setCardDescription] = useState();
  const [showStatus, setShowStatus] = useState();
  const [showVotes, setShowVotes] = useState();
  const [showS, setShowS] = useState();
  const [onlyOpen, setOnlyOpen] = useState(false);

  useEffect(() => {
    if (!onlyOpen) {
      loadPosts();
    } else {
      loadOpenPosts();
    }
  }, [onlyOpen]);

  async function loadPosts() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
    const data = await bestx.fetchPosts();
    // console.log(data)
    const items = await Promise.all(
      data.map(async (i) => {
        let item = {
          itemId: i[0].toNumber(),
          tokenUrl: i[1],
          votes: i[2].toNumber(), // votes should only be displayed on closed posts (later on)
          artist: i[3],
          status: i[4],
          description: i[5],
        };
        return item;
      })
    );
    console.log("items", items)

    setPosts(items);

    setTimeout(function () {
      const videoComponents = document.getElementsByClassName("exploreCell");
      const videoComponents0 = document.getElementsByClassName(
        "imageCell exploreCell"
      );

      for (var i = videoComponents.length - 1; i >= 0; --i) {
        videoComponents0[i].addEventListener(
          "click",
          function (e) {
            showComponent(e);
          },
          false
        );
        videoComponents[i].addEventListener(
          "mouseover",
          function (e) {
            e.target.play();
          },
          false
        );
        videoComponents[i].addEventListener(
          "mouseout",
          function (e) {
            e.target.pause();
          },
          false
        );
      }
    }, 1000);
  }

  // console.log("posts data", posts);

  async function loadOpenPosts() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
    const data = await bestx.fetchPostsByStatus(0);
    // console.log(data)
    const items = await Promise.all(
      data.map(async (i) => {
        let item = {
          itemId: i[0].toNumber(),
          tokenUrl: i[1],
          votes: i[2].toNumber(), // votes should only be displayed on closed posts (later on)
          artist: i[3],
          status: i[4],
          description: i[5],
        };
        return item;
      })
    );
    // console.log("items", items)

    setPosts(items);

    setTimeout(function () {
      const videoComponents = document.getElementsByClassName("exploreCell");
      const videoComponents0 = document.getElementsByClassName(
        "imageCell exploreCell"
      );

      for (var i = videoComponents.length - 1; i >= 0; --i) {
        videoComponents0[i].addEventListener(
          "click",
          function (e) {
            showComponent(e);
          },
          false
        );
        videoComponents[i].addEventListener(
          "mouseover",
          function (e) {
            e.target.play();
          },
          false
        );
        videoComponents[i].addEventListener(
          "mouseout",
          function (e) {
            e.target.pause();
          },
          false
        );
      }
    }, 1000);
  }

  const styles = {
    content: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: "#021015",
      padding: "27px",
    },
    title: {
      color: "white",
    },
    redCard: {
      color: "white",
    },
    greenCard: {
      color: "#01A02D",
    },
    displayCrown: {
      display: "initial",
    },
    displayCrown0: {
      display: "none",
    },
  };

  function filterContent() {
    let openClosedSelect0 = document.getElementById("openClosedSelect0");
    let openClosedSelect1 = document.getElementById("openClosedSelect1");

    if (openClosedSelect0.checked) {
      console.log("Display Open and Closed");
      openExploreModal2();
      setOnlyOpen(false);
    }

    if (openClosedSelect1.checked) {
      console.log("Display Open Only");
      openExploreModal2();
      setOnlyOpen(true);
    }
  }

  var creatorShowContent;

  function showComponent(e) {
    let homepageFlexContainer = document.getElementById(
      "homepageFlexContainer"
    );
    homepageFlexContainer.style.display = "none";
    let showModal = document.getElementById("showModal");
    showModal.style.display === "flex"
      ? (showModal.style.display = "")
      : (showModal.style.display = "flex");

    window.scrollTo({ top: 0 });

    setShowArtist(e.path[1].attributes[3].value);
    setShowArtist0(e.path[1].attributes[4].value);
    setCardItemId(parseInt(e.path[1].attributes[5].value));
    setCardDescription(e.path[1].attributes[6].value);
    setShowSrc(e.path[0].currentSrc);
    setShowStatus(e.path[1].attributes[1].value);
    setShowVotes(e.path[1].attributes[2].value);
    setShowS(e.path);
  }

  const renderContent = () => {
    let contentArray = [];
    if (posts) {
      posts.forEach((card, i) => {
        let cardStatus = card.status === 0 ? "OPEN" : card.votes;
        let cardStatusColor =
          card.status === 0 ? styles.greenCard : styles.redCard;
        let cardStatusCrown =
          card.status === 0 ? styles.displayCrown0 : styles.displayCrown;
        let cardStatusClass =
          card.status === 0 ? "exploreCardStatus exploreCardStatus0 exploreCardStatus2" : "exploreCardStatus exploreCardStatus0 exploreCardStatus3"
        contentArray.push(
          <button
            key={i}
            className="cell cell50percent"
            data-cardstatus={card.status}
            data-cardvotes={card.votes}
            data-cardartist={`${card.artist.slice(0, 4)}...${card.artist.slice(
              -4
            )}`}
            data-cardartist0={card.artist}
            data-carditemid={i}
            data-carddescription={card.description}
            type="button"
          >
            <div className="exploreCardContent">
              <img className="creatorImage" src={CreatorImage} alt="" />
              {/* <div><FaUser/></div> */}
              <div className="creatorAttributes"><span className="creatorAttributes0">
                {`${card.artist.slice(0, 4)}...${card.artist.slice(-4)}`}{" "}
                <span className="creatorAttributesFont">in</span> All Categories</span>
                <br />
                <span className="creatorAttributesFont">
                  {card.description.substring(0, 50)}...
                </span>
              </div>
            </div>
            <video className="imageCell exploreCell" muted>
              <source src={card.tokenUrl} type="video/mp4" />
            </video>
            <div key={i + 1000} className="exploreCardContentRight">
              <div style={cardStatusColor} className={cardStatusClass}>
                {cardStatus}<img style={cardStatusCrown} className="showCrown showCrown1" src={Crown} alt="" />
              </div>
            </div>
          </button>
        );
      });
      return contentArray;
    }
  };

  function openExploreModal0() {
    let exploreNavModalID2 = document.getElementById("exploreNavModalID2");
    let exploreNavModalSVGD2 = document.getElementById("exploreNavSVGD2");
    let exploreNavModalSVGU2 = document.getElementById("exploreNavSVGU2");
    let exploreNavModalID1 = document.getElementById("exploreNavModalID1");
    let exploreNavModalSVGD1 = document.getElementById("exploreNavSVGD1");
    let exploreNavModalSVGU1 = document.getElementById("exploreNavSVGU1");
    let exploreNavModalID0 = document.getElementById("exploreNavModalID0");
    let exploreNavModalSVGD0 = document.getElementById("exploreNavSVGD0");
    let exploreNavModalSVGU0 = document.getElementById("exploreNavSVGU0");
    if (exploreNavModalID1.style.display === "block") {
      exploreNavModalID1.style.display = "";
      exploreNavModalSVGD1.classList.remove("hidden");
      exploreNavModalSVGU1.classList.add("hidden");
    }
    if (exploreNavModalID2.style.display === "block") {
      exploreNavModalID2.style.display = "";
      exploreNavModalSVGD2.classList.remove("hidden");
      exploreNavModalSVGU2.classList.add("hidden");
    }
    exploreNavModalID0.style.display === "block"
      ? (exploreNavModalID0.style.display = "")
      : (exploreNavModalID0.style.display = "block");
    exploreNavModalSVGD0.classList.contains("hidden")
      ? exploreNavModalSVGD0.classList.remove("hidden")
      : exploreNavModalSVGD0.classList.add("hidden");
    exploreNavModalSVGU0.classList.contains("hidden")
      ? exploreNavModalSVGU0.classList.remove("hidden")
      : exploreNavModalSVGU0.classList.add("hidden");
  }

  function openExploreModal1() {
    let exploreNavModalID2 = document.getElementById("exploreNavModalID2");
    let exploreNavModalSVGD2 = document.getElementById("exploreNavSVGD2");
    let exploreNavModalSVGU2 = document.getElementById("exploreNavSVGU2");
    let exploreNavModalID1 = document.getElementById("exploreNavModalID1");
    let exploreNavModalSVGD1 = document.getElementById("exploreNavSVGD1");
    let exploreNavModalSVGU1 = document.getElementById("exploreNavSVGU1");
    let exploreNavModalID0 = document.getElementById("exploreNavModalID0");
    let exploreNavModalSVGD0 = document.getElementById("exploreNavSVGD0");
    let exploreNavModalSVGU0 = document.getElementById("exploreNavSVGU0");
    if (exploreNavModalID0.style.display === "block") {
      exploreNavModalID0.style.display = "";
      exploreNavModalSVGD0.classList.remove("hidden");
      exploreNavModalSVGU0.classList.add("hidden");
    }
    if (exploreNavModalID2.style.display === "block") {
      exploreNavModalID2.style.display = "";
      exploreNavModalSVGD2.classList.remove("hidden");
      exploreNavModalSVGU2.classList.add("hidden");
    }
    exploreNavModalID1.style.display === "block"
      ? (exploreNavModalID1.style.display = "")
      : (exploreNavModalID1.style.display = "block");
    exploreNavModalSVGD1.classList.contains("hidden")
      ? exploreNavModalSVGD1.classList.remove("hidden")
      : exploreNavModalSVGD1.classList.add("hidden");
    exploreNavModalSVGU1.classList.contains("hidden")
      ? exploreNavModalSVGU1.classList.remove("hidden")
      : exploreNavModalSVGU1.classList.add("hidden");
  }

  function openExploreModal2() {
    let exploreNavModalID2 = document.getElementById("exploreNavModalID2");
    let exploreNavModalSVGD2 = document.getElementById("exploreNavSVGD2");
    let exploreNavModalSVGU2 = document.getElementById("exploreNavSVGU2");
    let exploreNavModalID1 = document.getElementById("exploreNavModalID1");
    let exploreNavModalSVGD1 = document.getElementById("exploreNavSVGD1");
    let exploreNavModalSVGU1 = document.getElementById("exploreNavSVGU1");
    let exploreNavModalID0 = document.getElementById("exploreNavModalID0");
    let exploreNavModalSVGD0 = document.getElementById("exploreNavSVGD0");
    let exploreNavModalSVGU0 = document.getElementById("exploreNavSVGU0");
    if (exploreNavModalID1.style.display === "block") {
      exploreNavModalID1.style.display = "";
      exploreNavModalSVGD1.classList.remove("hidden");
      exploreNavModalSVGU1.classList.add("hidden");
    }
    if (exploreNavModalID0.style.display === "block") {
      exploreNavModalID0.style.display = "";
      exploreNavModalSVGD0.classList.remove("hidden");
      exploreNavModalSVGU0.classList.add("hidden");
    }
    exploreNavModalID2.style.display === "block"
      ? (exploreNavModalID2.style.display = "")
      : (exploreNavModalID2.style.display = "block");
    exploreNavModalSVGD2.classList.contains("hidden")
      ? exploreNavModalSVGD2.classList.remove("hidden")
      : exploreNavModalSVGD2.classList.add("hidden");
    exploreNavModalSVGU2.classList.contains("hidden")
      ? exploreNavModalSVGU2.classList.remove("hidden")
      : exploreNavModalSVGU2.classList.add("hidden");
  }

  return (
    <>
      <ShowModal
        creatorImageComponent={CreatorImage}
        showSrc={showSrc}
        showArtist={showArtist}
        showArtist0={showArtist0}
        showItemId={cardItemId}
        showDescription={cardDescription}
        showStatus={showStatus}
        showVotes={showVotes}
        showS={showS}
        posts={posts}
        contract={contract}
        setContract={setContract}
        web3Modal={web3Modal}
        setWeb3Modal={setWeb3Modal}
        connected={connected}
        setConnected={setConnected}
      />
      <div style={styles.content} className="container">
        <br />
        <br />
        <br />
        <div>
          <h1>
            <strong style={styles.title}>EXPLORE</strong>
          </h1>
        </div>
        <div>
          <ul className="exploreNav">
            <li className="exploreNavList">
              <Link to="/Explore" onClick={openExploreModal0}>
                ALL CATEGORIES
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="exploreNavSVGD0"
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
                  id="exploreNavSVGU0"
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
              <Link to="/Explore" onClick={openExploreModal1}>
                THIS WEEK
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="exploreNavSVGD1"
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
                  id="exploreNavSVGU1"
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
              <Link to="/Explore" onClick={openExploreModal2}>
                OPEN & CLOSED
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="exploreNavSVGD2"
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
                  id="exploreNavSVGU2"
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
          <form id="exploreNavModalID0" className="exploreNavModal">
            <div className="overlay"></div>
            <div className="rating">
              <input
                type="radio"
                name="rate"
                id="rate-1"
                value="1"
                disabled
              />
              <label>All Categories</label>

              <input
                type="radio"
                name="rate"
                id="rate-2"
                value="2"
                disabled
              />
              <label>Drum Solos</label>

              <input
                type="radio"
                name="rate"
                id="rate-3"
                value="3"
                disabled
              />
              <label>Guitar Riffs</label>

              <input
                type="radio"
                name="rate"
                id="rate-4"
                value="4"
                disabled
              />
              <label>Jazz Vocals</label>

              <input
                type="radio"
                name="rate"
                id="rate-5"
                value="5"
                disabled
              />
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
          <form id="exploreNavModalID1" className="exploreNavModal modalShift1">
            <div className="overlay"></div>
            <div className="rating">
              <input
                type="radio"
                name="rate"
                id="rate-1"
                value="1"
                disabled
              />
              <label>This week</label>

              <input
                type="radio"
                name="rate"
                id="rate-2"
                value="2"
                disabled
              />
              <label>Last week</label>

              <input
                type="radio"
                name="rate"
                id="rate-3"
                value="3"
                disabled
              />
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
        <div>
          <form id="exploreNavModalID2" className="exploreNavModal modalShift2">
            <div className="overlay"></div>
            <div className="rating">
              <input
                type="radio"
                name="rate"
                id="openClosedSelect0"
                value="1"
              />
              <label>Open & Closed</label>
              <label className="labelText">
                Display all videos, including those
              </label>
              <label className="labelText">that are closed to voting.</label>

              <input
                type="radio"
                name="rate"
                id="openClosedSelect1"
                value="2"
              />
              <label>Open Only</label>
              <label className="labelText">
                Filter results only to display videos
              </label>
              <label className="labelText">
                that are currently open for voting.
              </label>
            </div>
            <hr className="exploreModalHr" />
            <br />
            <button
              className="exploreModalCancel"
              onClick={openExploreModal2}
              type="button"
            >
              Cancel
            </button>
            <button
              className="ocFilterSubmitButton"
              type="button"
              onClick={filterContent}
            >
              Save
            </button>
          </form>
        </div>
        <div
          id="homepageFlexContainer"
          className="homepageFlexContainer exploreFlex explorePadding"
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Explore;
