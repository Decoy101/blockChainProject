import { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import moneyImage from "../assets/images/money.png"
import PostCard from "../new-components/Post";

function Profile() {
  const { user } = useMoralis();
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user)
      fetchUserProfile()
  }, [user]);

  const fetchUserProfile = async () => {
    const userDetails = await user.attributes
    console.log(userDetails)
    setUserDetails(userDetails)
  }

  useEffect(() => {
    loadPosts();
  }, [userDetails]);

  const getParamsObject = () => {
    let paramsObject = {
      page: 1,
      pageSize: 100,
      artists: userDetails?.ethAddress
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
        setPosts(formattedPosts)
      }
    });
  }
 
  return (
    <div className="my-40">
      <div className="flex justify-between items-start">
        <div className="flex h-full">
          <img src={moneyImage} alt="Money" className="h-full mr-12" />
          <div className="w-2/4">
            <p className="text-4xl font-semibold mb-4">{userDetails?.username}</p>
            <p className="text-4xl mb-16">{userDetails?.displayName}</p>
            <p className="font-light">{userDetails?.bio}</p>
          </div>
        </div>

        <div className="flex items-center">
          <button className="border rounded-full py-4 px-8 mr-4">Donate</button>
          <button className="border rounded-full py-4 px-8">Follow</button>
        </div>
      </div>

      <hr className="my-16 border border-gray-400" />

      <div className="flex flex-wrap justify-between items-center w-full">
        {
          posts.map((post, i) =>
            <PostCard post={post} key={i} />
          )
        }
      </div>
    </div>

  );
}

export default Profile;
