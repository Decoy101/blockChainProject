import BESTX from "../media/BestX.svg";
import keyImage from "../assets/images/key.png";
import personsImage from "../assets/images/persons.png";
import moneyImage from "../assets/images/money.png";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Homepage() {
  const history = useHistory();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/explore')
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div className="w-1/4">
        <img className="w-full" src={BESTX} alt="bestx-logo" />
        <br />
        <p className="text-justify">
          BestX is a game that rewards musicians for creating quality content - and allows fans to contribute to their success.
        </p>
        <br />
        <div>
          <button className="border mr-8 rounded-full bg-yellow-400 p-4">Join the beta</button>
          <button className="border rounded-full p-4">How does it work</button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mt-40">
        <div className="flex justify-center items-center w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={moneyImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold mb-4">Earn extra cash on the side.</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id eleifend fermentum metus elementum est venenatis, gravida lorem. Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={personsImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold mb-4">Discover new artists and collaborators.</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id eleifend fermentum metus elementum est venenatis, gravida lorem. Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center w-1/2 mb-32">
          <div className="w-1/4 m-8">
            <img className="w-full" src={keyImage} alt="bestx-logo" />
          </div>
          <div className="w-3/4">
            <p className="text-4xl font-bold mb-4">Always retain ownership of your content.</p>
            <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id eleifend fermentum metus elementum est venenatis, gravida lorem. Pharetra, vestibulum, at ullamcorper donec.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center -mx-60 h-[500px] bg-[#193C47]">
        <p className="text-3xl">This week’s winners will be announced on
          <p className="text-3xl font-bold m-4">Friday, May 2nd at 12am ET</p>
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
        <p className="text-3xl">The current jackpot is
          <p className="text-3xl font-bold m-4">$5,243.12 USDC</p>
        </p>
      </div>

      <div className="text-center w-4/12 mx-auto my-48">
        <p className="text-4xl font-bold">Ready to show off your skills?</p>
        <p className="text-2xl mt-8">You’ll need a crypto wallet to sign up - but we can help you with that! Check out our FAQs for more guidance.</p>
        <button className="border mt-16 rounded-full bg-yellow-400 p-4">Join the beta</button>
      </div>
    </div >
  );
}

export default Homepage;