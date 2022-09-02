import React from 'react'

function About() {

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
            <br /><br /><div>
                <h1><strong>About BestX</strong></h1>
                <h2><em>The Problem</em></h2>
                <p>
                    Most artists are broke. Being an artist is a lifelong mission, full of sacrifices for some, and lots of hours spent developing a craft. Most artists we know need a day job that pays the bills, and when they do get paid for their art, it’s most often ridiculously little.
                </p>
            </div>

            <div>
                <h2><em>Creator Economy Revolution?</em></h2>
                <p>
                    Enter web3 and the promise of internet democratization, and the creator economy revolution only to find out that a lot of products out there are more or less still faced with the same problem. Few people make a lot, and the rest makes either very little or loses money.
                </p>
            </div>

            <div>
                <h2><em>GameFi and Content Creation</em></h2>
                <p>
                    How often do you start listening to somebody talking about a great web3 protocol, where there are unthinkable APY’s, staking and perpetual royalties only to completely lose them 2 minutes later.
                    Can there be a functioning, easy-to-use product that's actually understandable without a required course in DeFi and Tokenomics?
                    Can there be a fun way of having your content generate revenue for you?
                    Could you finally monetize your art that took you years and years to craft?
                    The answer to all the above is “yes”, by the way.
                </p>
            </div>

            <div>
            <h2><em>What BestX is and what it's not</em></h2>
                <p>
                    BestX sits at the intersection of decentralized finance, gaming and content creation. 
                    <br/>
                    We are a tool for any artist to dirtectly monetize their content, and get discovered. 
                    <br/>
                    We're a tool for fans to support and be exposed to new artists. Future iterations will also allow fans to win prizes for supporting artists. 
                    <br/>
                    We're NOT a streaming tool, so we are not trying to replace Spotify, SoundCloud, Apple Music etc.. 
                    On the contrary we encourage you to share as many ways as possible for your fans to find your content out there. 
                </p>
            </div>

            <div>
                <h2><em>Why are we doing this?</em></h2>
                <p>
                    Honestly we’re just tired of dealing with a broken system, and we found a pretty easy solution.
                </p>
            </div><br />
        </div>
        </div>
    )
}

export default About
