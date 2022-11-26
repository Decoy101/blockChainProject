import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

function SelectUsername() {
  const { user } = useMoralis();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const history = useHistory()

  useEffect(() => {
    if (user)
      fetchUsername()
  }, [user]);

  const fetchUsername = async () => {
    const userName = await user?.get('username')
    setUserName(userName);
  }

  const handleUserName = (e) => {
    setUserName(e.target.value)
    setDisableSubmit(false)
  }

  const handleSubmit = () => {
    user.set('username', userName);
    user.set('isUsernameUpdated', true);
    user
      .save()
      .then((data) => {
        history.replace('/')
      })
      .catch((error) => {
        if (error.code === 202)
          setError("This name is already taken.")
      });
  }

  return (
    <div className="min-h-screen mt-48">
      <p className="text-5xl text-white font-semibold mb-4">Hey! 👋
        <br className="mb-4" />
        Please pick a username.</p>
      <p className="text-xl text-white mb-4">Don’t stress it - you can change anytime.</p>
      <div className="relative mb-6">
        <p className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">@</p>
        <input className="bg-[#3A3A40] rounded-md pl-10 p-4 mb-8 block" placeholder="username" name="userName" value={userName} onChange={handleUserName} ></input>
      </div>
      {error ? <p className="text-red-700">{error}</p> : null}

      <br></br>
      <button disabled={disableSubmit} type="submit" onClick={handleSubmit} className="rounded-full bg-blue-500 px-4 py-2 disabled:opacity-75">Submit</button>
    </div>
  );
}

export default SelectUsername;
