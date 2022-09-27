import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Web3Modal from "web3modal";
import UploadImage from ".././images/uploadImage.png";
import BestX from "../web3/BestX.json";
import { bestxAddress } from "../../config-keys";
import { ethers } from "ethers";
import Countdown from "./Countdown";
import JackPot from "./Jackpot";

function Create({
  web3Modal,
  setWeb3Modal,
  connected,
  setConnected,
  contract,
  setContract,
}) {
  const [vidDescription, setVidDescription] = useState(0);

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
    categoryFont: {
      fontWeight: "normal",
    },
    qStyling: {
      color: "#F8F8F8",
    },
    textParent: {
      position: "relative",
    },
    linkStyling: {
      color: "white",
      textDecoration: "none",
    },
    descriptionStyling: {
      position: "relative",
      fontSize: "large",
    },
  };

  useEffect(() => {
    dragDrop();
  }, []);

  const history = useHistory();

  async function create(tokenUrl, description) {
    // need to double check if this only works for metamask wallets (later on)
    // otherwise import the whole providers array from navbar

    let connection;

    if (web3Modal === null) {
      const web3Modal = new Web3Modal();
      setWeb3Modal(web3Modal);
      connection = await web3Modal.connect();
    } else {
      connection = await web3Modal.connect();
    }

    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, signer);
    await bestx.createPost(tokenUrl, description);
    var dragDropHeader = document.getElementById("dragDropHeader");
    dragDropHeader.innerHTML = "REDIRECTING...";

    setConnected(true);
    setContract(bestx);

    // Redirect goes here.

    
  }

  setTimeout(function () {
    const mintVideo = document.getElementById("mintVideo");

    mintVideo.addEventListener("click", function () {
      let confirmCheckbox = document.getElementById("confirmCheckBox");
      let videoDescription = document.getElementById("videoDescription");
      let prevImage = document.getElementsByClassName("prevImage");
      let attestation = document.getElementById("attestation");
      let warningText0 = document.getElementById("warningText0");
      let warningText1 = document.getElementById("warningText1");
      let textDescription = document.getElementById("textDescription");
      let confirmCheckBox0 = document.getElementById("confirmCheckBox0");

      if (
        confirmCheckbox.checked &&
        videoDescription.value.length > 0 &&
        prevImage[0]
      ) {
        submitForm();
      } else {
        if (!prevImage[0]) {
          warningText0.classList.remove("hidden");
        } else {
          warningText0.classList.add("hidden");
        }
        if (videoDescription.value.length === 0) {
          warningText1.classList.remove("hidden");
          textDescription.style.color = "#F1BC34";
        } else {
          warningText1.classList.add("hidden");
          textDescription.style.color = "white";
        }
        if (confirmCheckbox.checked) {
          attestation.style.color = "white";
          confirmCheckBox0.style.border = "2px solid #CCC";
        } else {
          confirmCheckBox0.style.border = "2px solid #F1BC34";
          attestation.style.color = "#F1BC34";
        }
      }
    });
  }, 5);

  var submitFormVar;
  var removeContentVar;

  function submitForm() {
    submitFormVar = 1;
    return submitFormVar;
  }

  function removeContent() {
    removeContentVar = 1;
    return removeContentVar;
  }

  function inputReceipt(e) {
    console.log("done");
  }

  function handleTextAreaContent(e) {
    const {
      target: { name, value },
    } = e;
    setVidDescription({ [name]: value.length });
  }

  console.log(vidDescription);

  setTimeout(function () {
    var dropSpaceStylingText = document.getElementById("dropSpaceStylingText");
    if (vidDescription["Video Description"]) {
      dropSpaceStylingText.style.border = "1px dashed #F1BC34";
    } else {
      dropSpaceStylingText.style.border = "1px dashed #CCC";
    }
  }, 51);

  function expandCreateDataContainer() {
    var element = document.getElementById("createDataPoolExpand");
    var element0 = document.getElementById("createDataCountdownDetails");
    let createNavSVGD0 = document.getElementById("createNavSVGD0");
    let createNavSVGU0 = document.getElementById("createNavSVGU0");

    element0.classList.contains("hidden")
      ? element0.classList.remove("hidden")
      : element0.classList.add("hidden");
    element.style.height === ""
      ? (element.style.height = "650px")
      : (element.style.height = "");

    createNavSVGD0.classList.contains("hidden")
      ? createNavSVGD0.classList.remove("hidden")
      : createNavSVGD0.classList.add("hidden");
    createNavSVGU0.classList.contains("hidden")
      ? createNavSVGU0.classList.remove("hidden")
      : createNavSVGU0.classList.add("hidden");
  }

  function dragDrop() {
    // ************************ Drag Drop Start ***************** //
    let dropSpace = document.getElementById("dropSpace");

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropSpace.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ["dragenter", "dragover"].forEach((eventName) => {
      dropSpace.addEventListener(eventName, highlight, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropSpace.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropSpace.addEventListener("drop", handleDrop, false);

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight(e) {
      dropSpace.classList.add("highlight");
    }

    function unhighlight(e) {
      dropSpace.classList.remove("active");
    }

    function handleDrop(e) {
      var dTransfer = e.dataTransfer;
      var files = dTransfer.files;

      handleFiles(files);
    }

    var loadIntervalStore = [];

    function handleFiles(files) {
      let newFile = [];
      newFile.push(files);
      // initializeProgress(files.length)
      // files.forEach(uploadFile)
      newFile.forEach(previewFile);
      const loadInterval = setInterval(function () {
        if (submitFormVar) {
          console.log("Submitting");
          newFile.forEach(uploadFile);
          submitFormVar = null;
        } else if (removeContentVar) {
          console.log("remove content clicked");
          var dragDropHeader = document.getElementById("dragDropHeader");
          dragDropHeader.innerHTML = "DRAG & DROP A VIDEO TO UPLOAD!";
          var selectButton = document.getElementById("selectButton");
          selectButton.innerHTML = "Select File";
          var prevImageCollection =
            document.getElementsByClassName("prevImage");
          if (prevImageCollection.length > 0) {
            for (var i = prevImageCollection.length - 1; i >= 0; --i) {
              prevImageCollection[i].remove();
            }
          }
          removeContentVar = null;
          submitFormVar = null;
          clearInterval(loadInterval);
        } else {
          submitFormVar = null;
        }
      }, 500);
      loadIntervalStore.push(loadInterval);
      if (loadIntervalStore.length === 2) {
        clearInterval(loadIntervalStore[0]);
        loadIntervalStore.shift();
      }
    }

    function previewFile(file) {
      const selectButton = document.getElementById("selectButton");
      selectButton.innerHTML = "Remove?";
      selectButton.htmlFor = "";
      selectButton.addEventListener(
        "click",
        function (event) {
          if (this === event.target) {
            /* click was on label */
            removeContent();
          }
        },
        false
      );

      var dragDropHeader = document.getElementById("dragDropHeader");
      dragDropHeader.innerHTML = "CONTENT READY FOR UPLOAD!";
      dragDropHeader.style.textAlign = "center";

      var file = file[0];
      var fileReader = new FileReader();
      if (file.type.match("image")) {
        fileReader.onload = function () {
          var img = document.createElement("img");
          img.classList.add("prevImage");
          img.src = fileReader.result;
          document.getElementById("gallery").appendChild(img);
        };
        fileReader.readAsDataURL(file);
      } else {
        fileReader.onload = function () {
          var blob = new Blob([fileReader.result], { type: file.type });
          var url = URL.createObjectURL(blob);
          var video = document.createElement("video");
          var timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
              video.pause();
            }
          };
          video.addEventListener("loadeddata", function () {
            if (snapImage()) {
              video.removeEventListener("timeupdate", timeupdate);
            }
          });
          var snapImage = function () {
            var canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext("2d")
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
              var img = document.createElement("img");
              img.src = image;
              img.classList.add("prevImage");
              document.getElementById("gallery").appendChild(img);
              URL.revokeObjectURL(url);
            }
            return success;
          };
          video.addEventListener("timeupdate", timeupdate);
          video.preload = "metadata";
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
        };
        fileReader.readAsArrayBuffer(file);
      }
      var uImage = document.getElementById("uploadImage");
      uImage.style.opacity = "0";
    }

    async function uploadFile(file, i) {
      console.log("Starting Upload");
      var dragDropHeader = document.getElementById("dragDropHeader");
      var loadingAnimation = document.getElementById("loadingAnimation");
      var selectButton = document.getElementById("selectButton");
      var loadingContent = document.getElementById("loadingContent");
      dragDropHeader.style.position = "relative";
      dragDropHeader.style.top = "25px";
      dragDropHeader.innerHTML = "UPLOAD IN PROGRESS";
      dragDropHeader.style.textAlign = "center";
      loadingAnimation.classList.remove("hidden");
      loadingContent.classList.add("loadingContent");
      selectButton.style.opacity = "0";

      var file0 = file[0];

      // Set cloud name and upload preset here:
      var CLOUD_NAME = "bestxdao";
      var UPLOAD_PRESET = "b9pfgfve";

      var POST_URL =
        "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/auto/upload";

      var XUniqueUploadId = +new Date();

      processFile();
      // Slice file && send each:
      function processFile(e) {
        var size = file0.size;
        var sliceSize = 20000000;
        var start = 0;

        setTimeout(loop, 3);

        function loop() {
          var end = start + sliceSize;

          if (end > size) {
            end = size;
          }
          var s = slice(file0, start, end);
          send(s, start, end - 1, size);
          if (end < size) {
            start += sliceSize;
            setTimeout(loop, 3);
          }
        }
      }

      function send(piece, start, end, size) {
        var formdata = new FormData();

        formdata.append("file", piece);
        formdata.append("cloud_name", CLOUD_NAME);
        formdata.append("upload_preset", UPLOAD_PRESET);
        formdata.append("public_id", `BestXFile${Date.now()}`);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", POST_URL, false);
        xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
        xhr.setRequestHeader(
          "Content-Range",
          "bytes " + start + "-" + end + "/" + size
        );

        xhr.onload = async function () {
          console.log("Upload Completed");
          dragDropHeader.style.whiteSpace = "nowrap";
          dragDropHeader.innerHTML = `UPLOAD COMPLETE - AWAITING ${(contract?.signer.provider.connection.url)?.toUpperCase() || "WALLET"}`;
          dragDropHeader.style.top = "40px";
          var cmSvg = document.getElementById("checkmarkComponent");
          var loadingAnimation = document.getElementById("loadingAnimation");
          setTimeout(function () {
            loadingAnimation.style.transition = "opacity 0.5s";
            loadingAnimation.style.opacity = "0";
            cmSvg.classList.add("run-animation");
          }, 50);
          // do something to response
          const obj = JSON.parse(this.responseText);
          var videoDescription = document.getElementById("videoDescription");
          console.log(obj);
          console.log(videoDescription.value);

          await create(obj.url, videoDescription.value);

          // Placing redirect here for dev.

          setTimeout(function () {
            history.push("/Explore");
            setTimeout(function () {
              let banner = document.getElementById('bannerContainer')
                  banner.style.display = "flex"
            }, 1000);
          }, 3000);
        };

        xhr.send(formdata);
      }

      function slice(file, start, end) {
        var slice = file.mozSlice
          ? file.mozSlice
          : file.webkitSlice
          ? file.webkitSlice
          : file.slice
          ? file.slice
          : noop;
        return slice.bind(file)(start, end);
      }

      function noop() {}
    }
    // ************************ Drag Drop End ***************** //
  }

  return (
    <>
      <div style={styles.content} className="container">
        <br />
        <br />
        <br />
        <div className="createDataCard0">
          <div className="createDataCard">
            <div className="createDataTextHeader">Winner announcement in:</div>
            <div className="createDataTextBody">
              <Countdown />
            </div>
          </div>
        </div>
        <div className="createDataCard0 createDataAdjust">
          <div id="createDataPoolExpand" className="createDataCard">
            <div className="createDataTextHeader">Total pool (USDC):</div>
            <div className="createDataTextBody createDataTextBody0">
              <JackPot />
            </div>
            <div className="createDataTextFooter">
              <Link
                to="/Create"
                onClick={expandCreateDataContainer}
                style={styles.linkStyling}
              >
                How much can I win?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  id="createNavSVGD0"
                  className="exploreChevron exploreChevron0"
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
                  id="createNavSVGU0"
                  className="exploreChevron exploreChevron0 hidden"
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
            </div>
          </div>
        </div>
        <div className="createFormBackground"> </div>
        <div>
          <ul className="exploreNav createFormZI">
            <li className="exploreNavList createFontAdjust">
              <Link to="/Create" onClick={submitForm}>
                POST TO <span style={styles.categoryFont}>CATEGORY</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
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
          </ul>
          <h4 style={styles.qStyling} className="createFormZI">
            Questions? <u style={styles.qStyling0}>Learn how it works.</u>
          </h4>
          <br />
          <div id="dropSpace" className="dropSpaceStyling createFormZI">
            <div id="gallery"></div>
            <form className="createForm">
              <div id="loadingContent" className="">
                <div id="loadingAnimation" className="wrapper hidden">
                  <div className="circle circle0 rad01"></div>
                  <div className="circle circle0 rad02"></div>
                  <div className="circle circle0 rad03"></div>
                  <div className="circle circle0 rad04"></div>
                </div>
                <svg
                  id="checkmarkComponent"
                  className=""
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 193.3 193.3"
                >
                  <circle
                    className="circ0 circle"
                    cx="96.65"
                    cy="96.65"
                    r="94.15"
                  />
                  <polyline
                    className="circ0 checkmark"
                    points="46.9 101.4 76.9 131.4 146.4 61.9"
                  />
                </svg>
                <img
                  id="uploadImage"
                  className="uploadImage"
                  src={UploadImage}
                  alt=""
                />
                <h3 id="dragDropHeader" className="dragDropHeader">
                  DRAG & DROP A VIDEO TO UPLOAD!
                </h3>
                <br />
              </div>
              <input
                type="file"
                id="fileElem"
                onChange={inputReceipt}
                accept="video/mp4,video/x-m4v,video/*,image/*"
              />
              <label
                id="selectButton"
                className="selectButton"
                htmlFor="fileElem"
              >
                Select Files
              </label>
            </form>
          </div>
          <div id="warningText0" className="warningText hidden">
            This field is required
          </div>
          <br />
          <h3 id="textDescription" style={styles.descriptionStyling}>
            Write a brief description
          </h3>
          <div
            id="dropSpaceStylingText"
            style={styles.textParent}
            className="dropSpaceStyling"
          >
            <textarea
              id="videoDescription"
              name="Video Description"
              className="createForm createTextArea"
              onChange={handleTextAreaContent}
            />
          </div>
          <div className="counterText">
            {vidDescription["Video Description"] || 0}/1000
          </div>
          <div id="warningText1" className="warningText hidden">
            This field is required
          </div>
          <section title=".confirmCheckBox" className="confirmCheckBoxSection">
            <div className="confirmCheckBox">
              <input
                type="checkbox"
                value="None"
                id="confirmCheckBox"
                name="check"
              />
              <label id="confirmCheckBox0" htmlFor="confirmCheckBox"></label>
            </div>
          </section>
          <label id="attestation" className="attestation">
            I confirm that I own the rights to the material in this
            <br />
            video. <u>Learn more about what's permitted.</u>
          </label>
        </div>
        <button id="mintVideo" className="selectButton mintSubmit createFormZI">
          MINT VIDEO FOR $1
        </button>
      </div>
    </>
  );
}

export default Create;
