import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function PostCard(props) {
  const { post } = props
  return (
    <div className="mr-4 mb-8 w-[48%] bg-gray-800 rounded-xl">
      <Link to={{ pathname: "/video-details", state: { post } }}>

        <video muted onMouseEnter={(e) => e.target.play()} src={post.videoUrl} onMouseLeave={(e) => e.target.pause()}>
        </video>
        <div className="p-4">
          <div className="flex justify-between mt-4">
            <div className="flex w-3/4">
              <div className="mr-4 mb-2"><FaUser /></div>
              <div>
                <p className="font-bold">
                  {`${post.artist.slice(0, 4)}...${post.artist.slice(-4)} `}
                  <span className="font-normal">in</span> {post.category}
                </p>
                <p className="font-light">
                  {post.description.substring(0, 50)}...
                </p>
              </div>
            </div>

            <div>
              {
                !post.status ?
                  <div className="p-2 px-4 rounded-md bg-green-700">
                    Open
                  </div>
                  : null
              }
            </div>

          </div>

          {/* <div key={i + 1000} className="exploreCardContentRight">
            <div style={cardStatusColor} className={cardStatusClass}>
              {cardStatus}<img style={cardStatusCrown} className="showCrown showCrown1" src={Crown} alt="" />
            </div>
          </div> */}
        </div>
      </Link >
    </div >
  );
}

export default PostCard;
