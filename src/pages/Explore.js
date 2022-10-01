import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { ethers } from "ethers";
import BestX from "../web3/BestX.json";
import { bestxAddress } from "../../config-keys";
import { RiArrowDropDownLine } from "react-icons/ri";
import { postsDummyData } from "../../dev-data/explore";
import PostCard from "../new-components/Post";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [displayCategoryDropdown, setDisplayCategoryDropdown] = useState(false);
  const [displayWeekDropdown, setDisplayWeekDropdown] = useState(false);
  const [displayOpenCloseDropdown, setDisplayOpenCloseDropdown] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:7545"
    );
    const bestx = new ethers.Contract(bestxAddress, BestX.abi, provider);
    // const posts = await bestx.fetchPosts();
    const formattedPosts = postsDummyData.map((post) => ({
      id: post.id,
      videoUrl: post.videoUrl,
      votes: post.votes, // votes should only be displayed on closed posts (later on)
      artist: post.artists,
      status: post.status,
      description: post.description,
      category: post.category,
    }));
    setPosts(formattedPosts)
  }

  const categoryDropdown = () => {
    return (
      <div className="w-max rounded-xl absolute left-0 top-16 p-8 bg-gray-800">
        <input
          type="radio"
          name="category"
          id="category-1"
          value="1"
        />
        <label className="ml-4" for="category-1">All Categories</label>
        <br />

        <input
          type="radio"
          name="category"
          id="category-1-2"
          value="2"
        />
        <label className="ml-4" for="category-2">Drum Solos</label>
        <br />

        <input
          type="radio"
          name="category"
          id="category-3"
          value="3"
        />
        <label className="ml-4" for="category-3">Guitar Riffs</label>
        <br />

        <input
          type="radio"
          name="category"
          id="category-4"
          value="4"
        />
        <label className="ml-4" for="category-4">Jazz Vocals</label>
        <br />

        <input
          type="radio"
          name="category"
          id="category-5"
          value="5"
        />
        <label className="ml-4" for="category-5">Rap Battle</label>

        <hr className="my-4 border-gray-500" />
        <div className="flex justify-end">
          <button onClick={resetDropDowns}>Cancel</button>
          <button className="rounded-full bg-blue-500 px-4 py-2 ml-3">Save</button>
        </div>
      </div >
    )
  }

  const openCloseDropdown = () => {
    return (
      <div className="w-max rounded-xl absolute left-0 top-16 p-8 bg-gray-800">
        <div className="flex items-start">
          <input
            type="radio"
            name="status"
            id="status-1"
            value="1"
          />
          <label className="ml-4" for="status-1">
            <p>Open & Closed</p>
            <p className="font-light">Display all videos, including those</p>
            <p className="font-light">that are closed to voting.</p>
          </label>
        </div>

        <div className="flex items-start">
          <input
            type="radio"
            name="status"
            id="status-2"
            value="2"
          />
          <label className="ml-4" for="status-2">
            <p>Open Only</p>
            <p className="font-light">Filter results only to display videos</p>
            <p className="font-light">that are currently open for voting.</p>
          </label>
        </div>

        <hr className="my-4 border-gray-500" />
        <div className="flex justify-end">
          <button onClick={resetDropDowns}>Cancel</button>
          <button className="rounded-full bg-blue-500 px-4 py-2 ml-3">Save</button>
        </div>
      </div>
    )
  }

  const weekDropdown = () => {
    return (
      <div className="w-max rounded-xl absolute left-0 top-16 p-8 bg-gray-800">
        <div>
          <input
            type="radio"
            name="timeframe"
            id="timeframe-1"
            value="1"
          />
          <label className="ml-4" for="timeframe-1">This week</label>
        </div>

        <div>
          <input
            type="radio"
            name="timeframe"
            id="timeframe-2"
            value="2"
          />
          <label className="ml-4" for="timeframe-2">Last week</label>
        </div>

        <div>
          <input
            type="radio"
            name="timeframe"
            id="timeframe-3"
            value="3"
          />
          <label className="ml-4" for="timeframe-3">All time</label>
        </div>

        <hr className="my-4 border-gray-500" />
        <div className="flex justify-end">
          <button onClick={resetDropDowns}>Cancel</button>
          <button className="rounded-full bg-blue-500 px-4 py-2 ml-3">Save</button>
        </div>
      </div>
    )
  }

  const resetDropDowns = () => {
    setDisplayCategoryDropdown(false);
    setDisplayOpenCloseDropdown(false);
    setDisplayWeekDropdown(false);
  }

  const openCategoryDropdown = () => {
    resetDropDowns();
    setDisplayCategoryDropdown(true);
  }

  const openWeekDropdown = () => {
    resetDropDowns();
    setDisplayWeekDropdown(true);
  }

  const openStatusDropdown = () => {
    resetDropDowns();
    setDisplayOpenCloseDropdown(true);
  }

  return (
    <IconContext.Provider value={{ size: "2em" }}>
      <div>
        <p className="text-5xl font-bold mb-12">Explore</p>
        <div className="flex mb-16">
          <div className="relative">
            <button onClick={openCategoryDropdown} className="mr-8 flex items-center">ALL CATEGORIES <RiArrowDropDownLine /></button>
            {displayCategoryDropdown ? categoryDropdown() : null}
          </div>
          <div className="relative">
            <button onClick={openWeekDropdown} className="mr-8 flex items-center">THIS WEEK <RiArrowDropDownLine /></button>
            {displayWeekDropdown ? weekDropdown() : null}
          </div>
          <div className="relative">
            <button onClick={openStatusDropdown} className="mr-8 flex items-center">OPEN & CLOSED <RiArrowDropDownLine /></button>
            {displayOpenCloseDropdown ? openCloseDropdown() : null}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center w-full">
          {
            posts.map((post, i) =>
              <PostCard post={post} key={i} />
            )
          }
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Explore;
