import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi"

function FAQs() {
  const [isFaqOpen, setIsFaqOpen] = useState([false, false, false, false, false, false, false]);

  const toggleIsfaqOpen = (index) => {
    let updatedFaq = [...isFaqOpen];
    updatedFaq[index] = !isFaqOpen[index]
    setIsFaqOpen(updatedFaq);
  }

  return (
    <div className="w-8/12">
      <p className="text-5xl font-semibold mb-16">Frequently Asked Questions</p>
      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">How do I play?</p>
          {isFaqOpen[0] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(0)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(0)} />}
        </div>
        {isFaqOpen[0] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">Do I need a crypto wallet to play?</p>
          {isFaqOpen[1] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(1)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(1)} />}
        </div>
        {isFaqOpen[1] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">What content is permitted?</p>
          {isFaqOpen[2] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(2)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(2)} />}
        </div>
        {isFaqOpen[2] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">What content is not permitted?</p>
          {isFaqOpen[3] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(3)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(3)} />}
        </div>
        {isFaqOpen[3] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">How do I withdraw funds?</p>
          {isFaqOpen[4] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(4)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(4)} />}
        </div>
        {isFaqOpen[4] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">What’s with the $1 fee?</p>
          {isFaqOpen[5] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(5)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(5)} />}
        </div>
        {isFaqOpen[5] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
      <hr className="border-gray-500" />

      <div className="my-12">
        <div className="flex justify-between mb-3">
          <p className="font-semibold">May I submit the same video twice?</p>
          {isFaqOpen[6] ? <BiMinus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(6)} /> : <BiPlus color="white" size='2em' className=":hover cursor-pointer" onClick={() => toggleIsfaqOpen(6)} />}
        </div>
        {isFaqOpen[6] ? <p className="w-4/5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tortor, nibh vitae venenatis habitant fringilla amet in nunc. Nunc, nullam augue duis blandit sed id diam. Auctor velit porttitor vehicula diam. Consequat congue diam eleifend luctus elit bibendum.</p> : null}
      </div>
    </div>
  );
}

export default FAQs;
