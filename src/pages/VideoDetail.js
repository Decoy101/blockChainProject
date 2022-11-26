import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useMoralisCloudFunction } from "react-moralis";
import { useLocation } from "react-router-dom";
import Post from "../new-components/Post";

function VideoDetail(props) {
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation()

  useEffect(() => {
    loadPosts();
  }, []);

  const getParamsObject = () => {
    let paramsObject = {
      page: 1,
      pageSize: 100,
      artists: location.state.post?.artist
    }

    return paramsObject
  }

  const { fetch } = useMoralisCloudFunction(
    "getPosts",
    { ...getParamsObject() },
    { autoFetch: false }
  );

  async function loadPosts() {
    fetch({
      onSuccess: ({ data: posts }) => {
        const formattedPosts = posts.map((post) => ({
          id: post.id,
          videoUrl: post.videoURL,
          votes: post.votes, // votes should only be displayed on closed posts (later on)
          artist: post.artists,
          status: post.status,
          description: post.description ?? '',
          category: post.category,
        }));
        setUserPosts(formattedPosts)
      }
    });
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

      <p className="text-4xl font-bold mb-8">More From @{location.state.post.artist}</p>
      <div className="flex flex-wrap justify-between items-center w-full">
        {
          userPosts.map((post, i) =>
            post.id !== location.state.post.id ? <Post post={post} /> : null
          )
        }
      </div>
    </div>
  );
}

export default VideoDetail;
