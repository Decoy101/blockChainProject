import React, { useState, useEffect } from "react";
import BestX from "../../build/contracts/BestX.json";
import { bestxAddress } from "../../config-keys";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import Web3Modal from "web3modal";
import { FaUser } from "react-icons/fa";
import Crown from ".././images/crown0.png";
import Crown0 from ".././images/crown.png";
import CreatorImage from ".././images/creatorImage.png";

function ShowModal({
  creatorImageComponent,
  showSrc,
  showArtist,
  showArtist0,
  showDescription,
  showItemId,
  showS,
  showStatus,
  showVotes,
  posts,
  contract,
  setContract,
  web3Modal,
  setWeb3Modal,
  connected,
  setConnected,
}) {
  // console.log(showS);
  // console.log("showmodal contract", contract);
  // console.log("showArtist", showArtist);
  // console.log("showItemId", showItemId);
  // console.log("showDescription", showDescription);

  const styles = {
    redCard: {
      color: "white",
    },
    greenCard: {
      color: "#01A02D",
    },
    displayUpvote: {
      display: "flex",
    },
    displayUpvote0: {
      display: "none",
    },
    displayCrown: {
      display: "initial",
    },
    displayCrown0: {
      display: "none",
    },
  };

  const [userPosts, setUserPosts] = useState([]);
  const history = useHistory();

  function playVideo() {
    let showVideo = document.getElementById("showVideo");
    showVideo.play();
  }

  // async function voting() {
  //   if (contract) {
  //     try {
  //       await contract.upVote(showItemId);
  //       window.location.reload();
  //     } catch {
  //       console.log("something went wrong with the voting");
  //     }
  //   } else {
  //     window.alert("please sign in with your wallet");
  //   }
  // }

  async function voting() {

    if (contract) {
      try {
        await contract.upVote(showItemId);
        // window.location.reload();
      } catch {
        console.log("something went wrong with the voting");
      }
    } else {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const bestx = new ethers.Contract(bestxAddress, BestX.abi, signer);
      await bestx.upVote(showItemId);
      setContract(bestx);
    }

    setConnected(true);

    // window.location.reload();

    // Redirect goes here.
  }

  let cardStatus0 = parseInt(showStatus) === 0 ? "OPEN" : `${showVotes}`;
  let cardStatusColor0 =
    parseInt(showStatus) === 0 ? styles.greenCard : styles.redCard;
  let displayUpvoteComponent =
    parseInt(showStatus) === 0 ? styles.displayUpvote : styles.displayUpvote0;
  let cardStatusCrown =
    parseInt(showStatus) === 0 ? styles.displayCrown0 : styles.displayCrown;

  async function moreFromArtist() {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:7545"
      );
      const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
      const data = await bestx.postsByUser(showArtist0);
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
      setUserPosts(items);
    } catch {
      console.log("something wrong with posts by this artist");
    }
  }

  function hideComponent() {
    // console.log("component hidden")
    let homepageFlexContainer = document.getElementById(
      "homepageFlexContainer"
    );
    homepageFlexContainer.style.display = "flex";
    let showModal = document.getElementById("showModal");
    showModal.style.display = ""


    window.scrollTo({ top: 0 });
  }

  function loadShowListener() {
    setTimeout(() => {
      const returnToExplore = document.getElementById("returnToExplore")
      returnToExplore.addEventListener(
        "click",
        function () {
          hideComponent();
        },
        false
      );
    }, 50)
  }

  useEffect(() => {
    moreFromArtist();
    loadShowListener()
  }, [showArtist0]);

  // console.log("more from user", userPosts);
  // console.log("connection status", connected);

  const renderContent0 = () => {
    let contentArray0 = [];
    if (userPosts) {
      userPosts.forEach((card, i) => {
        let cardStatus = card.status === 0 ? "OPEN" : card.votes;
        let cardStatusColor =
          card.status === 0 ? styles.greenCard : styles.redCard;
        let cardStatusCrown =
          card.status === 0 ? styles.displayCrown0 : styles.displayCrown;
        let cardStatusClass =
          card.status === 0 ? "exploreCardStatus exploreCardStatus0 exploreCardStatus2" : "exploreCardStatus exploreCardStatus0 exploreCardStatus3"
        contentArray0.push(
          <button
            key={i}
            className="cell cell50percent2"
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
                {cardStatus}<img style={cardStatusCrown} className="showCrown showCrown0" src={Crown0} alt="" />
              </div>
            </div>
          </button>
        );
      });
      return contentArray0;
    }
  };

  return (
    <div id="showModal" className="modalBackground">
      <div className="showView">
        <div className="depositView0">
          <div key={Date.now()} className="cell" type="button">
            <video
              id="showVideo"
              className="imageCell exploreCell exploreCell0"
              onClick={playVideo}
              controls
            >
              <source src={showSrc} type="video/mp4" />
            </video>
            <div key={Date.now() + 1000} className="exploreCardContentRight">
              <div className="exploreCardStatus"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="showView showView0">
        <div className="cell cell50percent cell50percent0">
          <div className="showCardDetails">
            <div style={cardStatusColor0}>{cardStatus0}
              <img style={cardStatusCrown} className="showCrown" src={Crown} alt="" />
            </div>
            <div className="showCardDetails0">
              <span>
                <img
                  className="creatorImage creatorImage1"
                  src={creatorImageComponent}
                  alt=""
                />
                {/* <div className="creatorImage creatorImage1"><FaUser/></div> */}
              </span>
              <span className="showCardDetails1">{showArtist}</span>
            </div>
            <div className="showCardDetails2">
              <span className="showCardDetails3">in</span>
              <span className="showCardDetails1 showCardDetails4">
                All Categories
              </span>
            </div>
            <div className="showCardDetails2">
              <div className="showCardDetails5">
                {showDescription}
              </div>
            </div>
            <button
              id="returnToExplore"
              className="mintSubmit2"
              type="button"
            >
              BACK TO EXPLORE
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="exploreChevron0 exploreChevron2 exploreChevron3 exploreChevron4" fill="#051014" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <div className="showCardDetails2">
              <div className="artistShow">
                MORE FROM <span className="artistShow0">{showArtist}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cell cell50percent cell50percent0 cell50percent1">
          <button
            id="upvoteVideo"
            className="selectButton mintSubmit mintSubmit1 createFormZI"
            type="button"
            onClick={voting}
            style={displayUpvoteComponent}
          >
            UPVOTE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              id="exploreNavSVGU0"
              className="exploreChevron0 exploreChevron2 exploreChevron3"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                fill="#F1BC34"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
        <div className="homepageFlexContainer exploreFlex explorePadding exploreFlex0">
          {renderContent0()}
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
