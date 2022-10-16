import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { postsDummyData } from "../../dev-data/explore";
import RankingCard from "../components/RankingCard";

function Rankings() {
  const [posts, setPosts] = useState([]);
  const [displayCategoryDropdown, setDisplayCategoryDropdown] = useState(false);
  const [displayWeekDropdown, setDisplayWeekDropdown] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
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

  return (
    <div className="mb-40">
      <p className="text-5xl font-bold mb-12">Rankings</p>

      <div className="flex mb-16">
        <div className="relative">
          <button onClick={openCategoryDropdown} className="mr-8 flex items-center">ALL CATEGORIES <RiArrowDropDownLine /></button>
          {displayCategoryDropdown ? categoryDropdown() : null}
        </div>
        <div className="relative">
          <button onClick={openWeekDropdown} className="mr-8 flex items-center">THIS WEEK <RiArrowDropDownLine /></button>
          {displayWeekDropdown ? weekDropdown() : null}
        </div>
      </div>

      {
        posts.map((post, i) =>
          <RankingCard post={post} index={i + 1} key={i} />
        )
      }


    </div>
  );
}

export default Rankings;
