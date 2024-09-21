import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticket_codes } from "../../../actions/profile"; // Import the action correctly
import "./adminStyle.css";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [availableCodes, setAvailableCodes] = useState("");
  const [showAvailableCodes, setShowAvailableCode] = useState("");

  const codes = useSelector((state) => state.profile.ticket_codes);

  useEffect(() => {
    dispatch(ticket_codes());
  }, [dispatch]);

  const onChange = (e) => {
    setAvailableCodes(e.target.value);
  };

  const searchCodes = (e) => {
    e.preventDefault();

    const istrue = codes
      .filter((code) => code.uniqueCode.includes(availableCodes))
      .map((data) => data.uniqueCode);
    // console.log(istrue);
    if (istrue.length > 0 && istrue == "") {
      setShowAvailableCode(istrue);
    } else {
      setShowAvailableCode("Not In The System");
    }
  };

  return (
    <>
      <main className="admin-panel">
        <h1>Admin Panel</h1>

        <form>
          <input
            type="text"
            placeholder="search"
            className="search-input"
            onChange={(e) => onChange(e)}
          />

          <button className="search-button" onClick={searchCodes}>
            search
          </button>
        </form>

        <span className="ticket-title">
          <p>Ticket codes</p>
        </span>

        <span className="ticket-codes">
          <p> {showAvailableCodes}</p>
        </span>

        {codes && codes.length > 0 ? (
          <ul className="ticket-codes">
            {codes.map((data) => (
              <li key={data.uniqueCode} className="ticket-code">
                <p> {data.uniqueCode}</p>
              </li>
            ))}{" "}
            {/* Wrap the return statement in parentheses */}
          </ul>
        ) : (
          <p className="no-codes">No codes available</p>
        )}
      </main>
    </>
  );
};

export default AdminPanel;
