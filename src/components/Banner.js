import React from 'react'
import BannerImage from ".././images/bannerimg.png";

function Banner() {

    const styles = {
      content: {
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#031014",
      },
    };

    function closeBanner () {
      let banner = document.getElementById('bannerContainer');
      banner.style.display = "none"
    }

    return (
        <>
          <div id="bannerContainer" className="bannerContainer">
            <div className="bannerRectangle">
              <div className="notificationText">
                <img className="creatorImage creatorImage0" src={BannerImage} alt="" />
                <span>Thanks for submitting a video!</span>
              </div>
              <button
                onClick={closeBanner}
                id="depositViewCloseButton"
                className="depositViewCloseButton depositViewCloseButton0"
                aria-label="Close Banner"
              >
                &times;
              </button>
            </div>
          </div>
        </>
    )
}

export default Banner
