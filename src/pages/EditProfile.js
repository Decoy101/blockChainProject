import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import moneyImage from "../assets/images/money.png"

function EditProfile() {
  const { user } = useMoralis();
  const [editProfileForm, setEditProfileForm] = useState({
    username: '',
    displayName: '',
    bio: '',
    spotify: '',
    youtube: '',
    twitter: '',
    instagram: ''
  });

  const handleOnChange = (e) => {
    setEditProfileForm({ ...editProfileForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    user.save(editProfileForm);
  }

  useEffect(() => {
    if (user)
      fetchUserProfile()
  }, [user]);

  const fetchUserProfile = async () => {
    const { username, bio, spotify, youtube, twitter, instagram } = await user.attributes
    setEditProfileForm({
      ...editProfileForm,
      username: username ?? '',
      bio: bio ?? '',
      spotify: spotify ?? '',
      youtube: youtube ?? '',
      twitter: twitter ?? '',
      instagram: instagram ?? ''
    })
  }

  return (
    <div className="w-1/2 my-32">
      <p className="text-5xl font-semibold">Edit Profile</p>
      <div className="my-16 flex items-center"><img src={moneyImage} alt="Money" className="rounded-full" /> <button className="rounded-full px-4 py-2 border ml-4">Upload New</button></div>

      <label for="username">
        *Username
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" id="username" placeholder="username" name="username" value={editProfileForm.username} />

      <label for="displayName">
        *Display Name
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="Your real name (or whatever name you go by)" id="displayName" name="displayName" value={editProfileForm.displayName} />

      <label for="bio">
        Share a short bio
      </label>
      <textarea onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="What music you’re into, what music you make, etc..." id="bio" name="bio" value={editProfileForm.bio} />

      <hr className="mb-16 border border-gray-500" />
      <p className="text-3xl font-semibold mb-8">Include links to your social accounts:</p>

      <label for="spotify">
        Spotify
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="spotify" id="spotify" name="spotify" value={editProfileForm.spotify} />

      <label for="youtube">
        YouTube
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="youtube" id="youtube" name="youtube" value={editProfileForm.youtube} />

      <label for="twitter">
        Twitter
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="twitter" id="twitter" name="twitter" value={editProfileForm.twitter} />

      <label for="username">
        Instagram
      </label>
      <input onChange={handleOnChange} className="bg-[#3A3A40] rounded-md p-4 w-full mb-8" placeholder="instagram" id='instagram' name="instagram" value={editProfileForm.instagram} />

      <button type="submit" onClick={handleSubmit} className="rounded-full bg-blue-500 px-4 py-4 disabled:opacity-75 mt-4">Save Changes</button>
    </div>
  );
}

export default EditProfile;
