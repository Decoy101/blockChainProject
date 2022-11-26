import { AiOutlineClose } from "react-icons/ai"

function WithdrawDialog(props) {
  return (
    <div className="bg-[#3A3A40] fixed top-56 left-1/2 -ml-[12.5%] w-1/4 p-8 rounded-md shadow">
      <div className="text-[#F0F7FA] flex justify-between w-full">
        <p className="mb-4 font-bold text-3xl">Withdraw Funds</p>
        <AiOutlineClose color="white" size='2em' className=":hover cursor-pointer" onClick={props.callbackOnClose}/>
      </div>

      <hr className="mb-8 border border-gray-500" />

      <p className="mb-4 font-bold text-gray-400">Your current balance is:</p>
      <p className="mb-4 font-bold text-3xl">$1,234.56</p>

      <div>
        <button
          className="bg-[#4B8EA3] rounded-full text-white px-8 py-2 my-4 disabled:opacity-75"
        >
          Withdraw Funds
        </button>
      </div>
      <p className="mb-4 font-bold text-gray-400">Funds will be deposited in your connected wallet 0x8b4...5b7. </p>
    </div >
  );
}

export default WithdrawDialog;
