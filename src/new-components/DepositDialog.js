import { useState } from "react";

function DepositDialog() {
  const [depositForm, setDepositForm] = useState({
    fundingSource: '',
    amount: null
  });

  const handleOnChange = (e) => {
    setDepositForm({ ...depositForm, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-[#3A3A40] fixed top-56 left-1/2 -ml-[12.5%] w-1/4 p-8 rounded-md shadow">
      <p className="mb-4 font-bold text-3xl">Deposit Funds</p>
      <hr className="mb-8 border border-gray-500" />

      <label for="fundingSource">
        Funding Source
      </label>
      <input onChange={handleOnChange} className="bg-[#52525A] rounded-md p-4 w-full mb-8" placeholder="Funding Source" id="fundingSource" name="fundingSource" value={depositForm.fundingSource} />

      <label for="amount">
        Select Amount
      </label>
      <input onChange={handleOnChange} className="bg-[#52525A] rounded-md p-4 w-full mb-8" placeholder="Amount" id="amount" name="amount" value={depositForm.fundingSource} />

      <div>
        <button
          className="bg-[#4B8EA3] rounded-full text-white px-8 py-2 my-4 disabled:opacity-75"
        >
          Make Deposit
        </button>
      </div>
    </div >
  );
}

export default DepositDialog;
