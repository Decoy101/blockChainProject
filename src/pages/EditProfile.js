import { useState } from "react";
import moneyImage from "../assets/images/money.png"

function EditProfile() {
  const [editProfileForm, setEditProfileForm] = useState({
    userName: '',
    displayName: '',
    bio: '',
    links: {
      spotify: '',
      youtube: '',
      twitter: '',
      instagram: ''
    }
  });

  return (
    <div className="w-1/2 my-32">
      <p className="text-5xl font-semibold">Edit Profile</p>
      <div className="my-16 flex items-center"><img src={moneyImage} alt="Money" className="rounded-full" /> <button className="rounded-full px-4 py-2 border ml-4">Upload New</button></div>

      <label for="userName">
        *Username
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" id="userName" placeholder="username" name="userName" value={editProfileForm.userName} />

      <label for="displayName">
        *Display Name
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="Your real name (or whatever name you go by)" id="displayName" name="displayName" value={editProfileForm.displayName} />

      <label for="bio">
        Share a short bio
      </label>
      <textarea className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="What music you’re into, what music you make, etc..." id="bio" name="bio" value={editProfileForm.bio} />

      <hr className="mb-16 border border-gray-500" />
      <p className="text-3xl font-semibold mb-8">Include links to your social accounts:</p>

      <label for="spotify">
        Spotify
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="spotify" id="spotify" name="spotify" value={editProfileForm.links.spotify} />

      <label for="youtube">
        YouTube
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="youtube" id="youtube" name="youtube" value={editProfileForm.links.youtube} />

      <label for="twitter">
        Twitter
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="twitter" id="twitter" name="twitter" value={editProfileForm.links.twitter} />

      <label for="userName">
        Instagram
      </label>
      <input className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="instagram" id='instagram' name="instagram" value={editProfileForm.links.instagram} />

    </div>
  );
}

export default EditProfile;
