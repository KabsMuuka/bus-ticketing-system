import React, { useState } from "react";

function DateLimitor() {
  // Get today's date
  const today = new Date();
  const presentDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // Calculate the date 4 days from today
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 1);

  const futureDate_normal_format = futureDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  // State to hold the selected date
  const [date, setDate] = useState(presentDate);
  const handleDate = (e) => {
    setDate(e.target.value);

    //before converting to normal date format and storing in localStorage
    const before_conversion = e.target.value; //date string

    //Convert the date string to a Date object
    const dateObject = new Date(before_conversion);

    localStorage.setItem("date", dateObject.toISOString().split("T")[0]);

    //end
  };
  return (
    <input
      className="input text-center bg-slate-200 input-bordered max-w-xs mr-3"
      type="date"
      name="date"
      value={date}
      min={presentDate}
      max={futureDate_normal_format}
      onChange={handleDate}
    />
  );
}

export default DateLimitor;
