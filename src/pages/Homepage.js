import keyImage from "../assets/images/key.png";
import personsImage from "../assets/images/persons.png";
import moneyImage from "../assets/images/money.png";
import HomeBG from "../assets/images/homeBG.svg";
import bgObjects from "../assets/images/bgObjects.svg";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Homepage({ passLoading }) {
  return (
    <>
      <img
        src={HomeBG}
        alt=""
        className="absolute scale-150 -z-50"
        style={{ top: "-100px", left: "-1px" }}
      />
      <div className="w-1/2" style={{ marginTop: "10rem" }}>
        <p className="font-extrabold text-9xl">
          Chordif<span className="text-yellow-400">y</span>
        </p>
        <br />

        <p className="text-justify text-3xl font-sans mt-4">
          Chordify is a game that rewards musicians for creating quality content
          - and allows fans to contribute to their success.
        </p>
        <br />
        <div className="mt-9">
          <button className="border-b-indigo-900 mr-8 rounded-full bg-indigo-700 p-4 hover:ease-in-out duration-200 hover:text-indigo-900 hover:bg-white">
            Join the beta
          </button>
          <button className="border-b-indigo-900 rounded-full bg-indigo-700 p-4 hover:ease-in-out duration-200 hover:text-indigo-900 hover:bg-white">How does it work</button>
        </div>
      </div>
      {/* <img src={bgObjects} alt="" className="scale-[2.5] relative -z-50" style={{"top":"-20rem","left":"-10rem"}}/> */}
      {/* <img src={HomeBG} alt="" className="absolute w-full -z-50" style={{"left":"-1px"}}/> */}
      <div className="flex flex-row items-center w-full mt-40 gap-20">
        <div className="flex justify-center items-center w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={moneyImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold font-sans mb-4">
              Earn extra cash on the side.
            </p>
            <p className="text-justify font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id
              eleifend fermentum metus elementum est venenatis, gravida lorem.
              Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center font-sans w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={personsImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold font-sans mb-4">
              Discover new artists and collaborators.
            </p>
            <p className="text-justify font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id
              eleifend fermentum metus elementum est venenatis, gravida lorem.
              Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={keyImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold font-sans mb-4">
              Always retain ownership of your content.
            </p>
            <p className="text-justify font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id
              eleifend fermentum metus elementum est venenatis, gravida lorem.
              Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center -mx-60 h-[500px] bg-[#150440]">
        <p className="text-3xl">
          This week’s winners will be announced on
          <span className="text-3xl font-bold m-4">
            Friday, May 2nd at 12am ET
          </span>
        </p>
        <div className="flex justify-center my-8">
          <div className="bg-[#031014] p-4 m-6 rounded-md">
            <p className="font-bold text-8xl">6D</p>
          </div>
          <div className="bg-[#031014] p-4 m-6 rounded-md">
            <p className="font-bold text-8xl">5H</p>
          </div>
          <div className="bg-[#031014] p-4 m-6 rounded-md">
            <p className="font-bold text-8xl">43M</p>
          </div>
        </div>
        <p className="text-3xl">
          The current jackpot is
          <span className="text-3xl font-bold m-4">$5,243.12 USDC</span>
        </p>
      </div>

      <div className="text-center w-8/12 mx-auto my-28">
        <img
          src={HomeBG}
          alt=""
          className="absolute w-full -z-50"
          style={{ bottom: "-1px", left: "-1px" }}
        />
        <p className="text-5xl font-bold font-sans">Ready to show off your skills?</p>
        <p className="text-2xl mt-16 font-sans">
          You’ll need a crypto wallet to sign up - but we can help you with
          that! Check out our FAQs for more guidance.
        </p>
        <button className="border-b-indigo-900 font-sans mt-12 rounded-full bg-indigo-700 p-4 hover:ease-in-out duration-200 hover:text-indigo-900 hover:bg-white">
          Join the beta
        </button>
      </div>
    </>
  );
}

export default Homepage;
