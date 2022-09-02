import React from 'react'
import AcousticSolo from '.././images/acoustic_solo.svg';
import RecordingSesh from '.././images/recording_sesh.svg';

function Home() {
    return (
      <>
        <hr className="homepageHr" />
        <div className="homepageBanner">
            <h3>BestX is a game that rewards musicians for creating quality content - and allows fans to contribute to and share in their success.</h3>
        </div>
        <div className="homepageFlexContainer homepageFlexAttributes">
          <div className="cell"><img className="imageCell" src={AcousticSolo} alt=""/></div>
          <div className="cell textCell"><br /><div className="textAttributes"><h3><b>Artists:</b></h3>Share your best short videos.  BextX pools the earnings from daily submissions - and each week, we redistribute them to the highest performing artists.</div></div>
          <div className="cell textCell"><br /><div className="textAttributes"><h3><b>Fans:</b></h3>Support your favorite artists with your votes (and your dollars).  When your favorites win, you win too.</div></div>
          <div className="cell"><img className="imageCell" src={RecordingSesh} alt=""/></div>
        </div>
      </>
    )
}

export default Home
