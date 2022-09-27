import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import BestX from "../web3/BestX.json";
import { bestxAddress } from "../../config-keys";

function JackPot() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getJackPot();
  }, [posts.length]); // everytime the length of the posts changes, the component re-renders

  console.log(posts.length)

  async function getJackPot() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
    const data = await bestx.fetchPostsByStatus(0); // just get the open posts (which are the ones with Status Open ==> 0)

    setPosts(data);
  }

  // so every time posts is updated in the useEffect()
  // then pool and jackpot will be updated
  const pool = Math.ceil(posts?.length / 2);
  const jackpot = pool - (pool / 100) * 10;

  const firstPrize = (jackpot * 0.5).toFixed(2);
  const secondPrize = (jackpot * 0.3).toFixed(2);
  const thirdPrize = (jackpot * 0.1).toFixed(2);
  const fourthPrize = (jackpot * 0.06).toFixed(2);
  const fifthPrize = (jackpot * 0.04).toFixed(2);

  console.log(firstPrize, secondPrize, thirdPrize, fourthPrize, fifthPrize, jackpot);

  // just need to return the card displaying the jackpot and the prizes.
  return <>
          <div className="createDataCountdown">
            <div>
              ${jackpot}0
            </div>
            <div id="createDataCountdownDetails" className="createDataCountdownDetails hidden">
              <div className="createDataJackpotDetails">
                <hr className="createDataJackpotHr" />
                <div className="createDataJackpotDetails0">Prizes</div>
                <div className="createDataJackpotDetailsPrizeList">
                  <div className="createDataJackpotDetails1">1st - ${firstPrize}</div>
                  <div className="createDataJackpotDetails1">2nd - ${secondPrize}</div>
                  <div className="createDataJackpotDetails1">3rd - ${thirdPrize}</div>
                  <div className="createDataJackpotDetails1">4th - ${fourthPrize}</div>
                  <div className="createDataJackpotDetails1">5th - ${fifthPrize}</div>
                  <div className="createDataJackpotDetails3">
                    <div className="createDataJackpotDetails1 createDataJackpotDetails2">The publisher of any video that ranks in the top 50% earns their $1 back.</div>
                    <div className="createDataJackpotDetails1 createDataJackpotDetails2">BestX never takes a penny, and publishers always retain ownership of their videos.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </>;
}

export default JackPot;
