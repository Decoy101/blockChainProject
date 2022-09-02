import React from "react";

function FAQs() {
  const styles = {
    content: {
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#031014",
    },
  };

  return (
    <div>
      <div style={styles.content} className="container">
        <br />
        <br />
        <div>
          <h1
            style={{
              color: "white",
              fontFamily: "PT Sans Narrow",
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <h2>
            <em>Do I need a crypto-wallet to play?</em>
          </h2>
          <p>
            While you don’t need one to look around and consume the content, you
            do need a wallet if you want to play the game as an artist, or if
            you want to vote to support an artist.
            <br />
            We're working on making the on and off ramps as smooth as possible
            on our next iterations. So hang tight, we have some very interesting
            feautures coming up. You'll be able to play and withdraw using any
            form of payment you prefer.
          </p>
        </div>

        <div>
          <h2>
            <em>How many times can I post?</em>
          </h2>
          <p>
            As many as you want. You can vote for a video only once though.
            Think of it this way: a web3 version of TikTok where your viral
            video can make you money.
          </p>
        </div>

        <div>
          <h2>
            <em>What token do I use to play?</em>
          </h2>
          <p>
            Our Alpha and Beta versions will be run on an Ethereum Testnet. Our
            live version will allow you to play with Matic, ETH and eventually
            USDC.
          </p>
        </div>

        <div>
          <h2>
            <em>How do I get paid?</em>
          </h2>
          <p>
            Every week, at the end of the contest, your balance in our dapp will
            be updated according to how your content performed.
            <br />
            You can withdraw your balance anytime you want.
          </p>
        </div>

        <div>
          <h2>
            <em>How does this all work?</em>
          </h2>
          <p>
            Simple (as promised):
            <br />
            You mint your video for the equivalent of 1 USDC.
            <br />
            Users can then vote on their favorite videos for the duration of the
            contest (usually 1 week).
            <br />
            The top 5 performing videos will get a prize proportionate to the
            number of players.
            <br />
            The best half of the videos will get their money back.
            <br />
          </p>
        </div>
        <div>
          <h2>
            <em>What content is permitted?</em>
          </h2>
          <p>
            When you post something, you're confirming that you own the right to
            the content. Our goal is to create a revenue stream for artists
            using their own content, so no videos of you at the RHCP concert.
            Please stay away from unnecessary graphic or offensive content. Your
            video is part of your statement as an artist.
          </p>
          <h2>
            <em>How long can my post be, and why?</em>
          </h2>
          <p>
            Your video can be any length up to 30 seconds. It's meant to give
            fans a glimpse of what you can do. In the next iterations we'll
            create a more customizable experience for our artists, so fans will
            be able to know more about you by checking out your profile.
            <br />
            Our goal is for you to use this platform to generate revenue and
            attract people to other platforms where your content is hosted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
