import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { postsDummyData } from "../../dev-data/explore";
import Post from "../new-components/Post";

function VideoDetail(props) {
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation()

  console.log(location.state.post)

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
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
    setUserPosts(formattedPosts)
  }

  return (
    <div className="">
      <div className="-mx-48 mb-16 bg-gray-800">
        <video
          className="m-auto w-3/4"
          src={location.state.post.videoUrl}
          muted
          onMouseEnter={(e) => e.target.play()}
          onMouseLeave={(e) => e.target.pause()}
        >
        </video>
      </div>

      <button className="bg-green-700 rounded-md p-3 mb-4">Open</button>

      <div className="mb-16">
        <div className="flex mt-4">
          <div className="mr-4 mb-2"><FaUser /></div>
          <div>
            <p className="font-bold">
              {`${location.state.post.artist.slice(0, 4)}...${location.state.post.artist.slice(-4)} `}
              <span className="font-normal">in</span> All Categories
            </p>
            <p className="font-light">
              {location.state.post.description.substring(0, 50)}...
            </p>
          </div>
        </div>
      </div>

      <p className="text-4xl font-bold mb-8">More From @username</p>
      <div className="flex flex-wrap justify-between items-center w-full">
        {
          userPosts.map((card, i) =>
            <Post post={card} />
          )
        }
      </div>
    </div>
  );
}

export default VideoDetail;
