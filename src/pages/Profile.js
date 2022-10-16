import { useEffect, useState } from "react";
import { postsDummyData } from "../../dev-data/explore";
import moneyImage from "../assets/images/money.png"
import PostCard from "../new-components/Post";

function Profile() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="my-40">
      <div className="flex justify-between items-center">
        <div className="flex h-full">
          <img src={moneyImage} alt="Money" className="h-full mr-12" />
          <div className="w-2/4">
            <p className="text-4xl font-semibold mb-4">username</p>
            <p className="text-4xl mb-4">Display name</p>
            <p className="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra porta nisl, cursus ut egestas cursus feugiat. Ut aenean massa egestas arcu morbi tempor tristique.</p>
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
