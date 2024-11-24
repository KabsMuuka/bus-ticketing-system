import { useState } from "react";

const Feedback = () => {
  const [showmsg, setShowmsg] = useState(true);

  const [feedback, setFeedback] = useState("");

  const sendFeedback = (e) => {
    e.preventDefault();
    setShowmsg(true); //show message

    setFeedback("Your message has been recorded");

    setTimeout(() => {
      setShowmsg(false); //hide message
    }, 2000);
  };
  return (
    <>
      <div className="h-100 ml-16">
        <p className="text-center p-5 text-yellow-500">
          {" "}
          {showmsg && feedback}
        </p>
        <p className="text-yellow-300 font-comicSans text-3xl">Powertools </p>
        <p className="mt-10 font-bold text-2xl">
          Tell us about your sign In experience
        </p>
        <p className="mt-7 mb-3 font-bold text-lg ">
          what would you like to tell us about today
        </p>
        {/* 
      <select>
        <option value={"firstOption"}> A problem or bug </option>
        <option value={"secondOption"}> A suggestion </option>
      </select> */}
        <input type="radio" id="option1" name="report" value="option1" />
        <label for="option1"> A problem or bug</label> <br />
        <input type="radio" id="option2" name="suggestion" value="option2" />
        <label for="option2">A suggestion</label> <br />
        <textarea className="bg-gray-300 w-50 h-20 rounded-md"> </textarea>{" "}
        <br />
        <button
          onClick={sendFeedback}
          className="btn bg-blue-500 text-white border-none"
        >
          {" "}
          send{" "}
        </button>
      </div>
    </>
  );
};

export default Feedback;
