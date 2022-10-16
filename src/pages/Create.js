import crownImage from "../assets/images/crown.png";
import moneyImage from "../assets/images/money.png";

function Create() {
  return (
    <div className="mb-24">
      <p className="text-5xl font-semibold mb-4">Post a Video</p>
      <p className="mb-8 font-light">Questions? Learn how it works</p>

      <div className="flex justify-between">
        <div className="w-3/5">
          <div className="bg-[#27272A] h-[32rem] flex flex-col justify-center items-center mb-12 rounded border border-dashed">
            <p className="text-3xl font-semibold mb-6">*Drag & Drop a Video</p>
            <p className="mb-6 font-light">Accepted file formats: .mov .mpg .mp4</p>
            <button className="rounded-full border p-3">Select a File</button>
          </div>
          <p className="mb-12 text-2xl font-semibold">Share a brief description</p>
          <textarea placeholder="Helper text goes here" className="bg-[#27272A] w-full p-4 h-72 mb-8 rounded"></textarea>
          <p className="mb-12 text-2xl font-semibold">Select a Category</p>
          <select className="bg-inherit border rounded-md p-4 w-full mb-12">
            <option hidden>Category Name</option>
            <option>Jazz</option>
            <option>Classic</option>
            <option>Guitar</option>
          </select>
          <input className="h-8 w-8" type="checkbox" id="confirmBox" name="confirmBox" value={true} />
          <label className="ml-4 align-top font-normal" for="confirmBox">
            I confirm that I own the rights to the material in this video.
            <p className="underline mt-2">Learn more about what’s permitted.</p>
          </label>
          <div className="mt-12">
            <button className="rounded-full p-4 bg-[#4B8EA3]">Submit Video for $1</button>
          </div>
        </div>

        <div className="w-1/4">
          <div className="bg-[#193C47] mb-8 rounded flex flex-col items-center justify-between p-16">
            <div className="w-28 mb-6">
              <img className="w-full" src={crownImage} alt="crown" />
            </div>
            <p className="mb-6">Winner announcement in:</p>
            <div className="flex">
              <p className="font-bold text-5xl mr-4">6D</p>
              <p className="font-bold text-5xl mr-4">5H</p>
              <p className="font-bold text-5xl">43M</p>
            </div>
          </div>

          <div className="bg-[#193C47] mb-8 rounded flex flex-col items-center justify-between p-8">
            <div className="w-28 mb-6">
              <img className="w-full" src={moneyImage} alt="money" />
            </div>
            <p className="mb-6">Total pool (USDC):</p>
            <div className="flex mb-6">
              <p className="font-bold text-5xl">$5,243.12</p>
            </div>
            <p className="font-light underline decoration-slate-400">How much can I win?</p>
            <div>
              <hr className="my-4 border border-gray-400" />
              <p className="mb-4 text-2xl font-semibold">Prizes</p>
              <p className="mb-4 font-semibold">1st - $1,310.75 <span className="text-gray-400">(25%)</span></p>
              <p className="mb-4 font-semibold">2nd - $786.45 <span className="text-gray-400">(15%)</span></p>
              <p className="mb-4 font-semibold">3rd - $262.15 <span className="text-gray-400">(5%)</span></p>
              <p className="mb-4 font-semibold">4rd - $157.29 <span className="text-gray-400">(3%)</span></p>
              <p className="mb-4 font-semibold">5th - $104.86 <span className="text-gray-400">(2%)</span></p>
              <p className="mb-4 font-light">The publisher of any video that ranks in the top 50% earns their $1 back.</p>
              <p className="font-light">BestX never takes a penny, and publishers always retain ownership of their videos.</p>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
}

export default Create;
