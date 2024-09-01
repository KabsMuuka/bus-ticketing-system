import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticket_codes } from "../../../actions/profile"; // Import the action correctly
import "./adminStyle.css";

const Admin = () => {
  const dispatch = useDispatch();

  const codes = useSelector((state) => state.profile.ticket_codes);
  // console.log("from admin", codes);

  useEffect(() => {
    dispatch(ticket_codes());
  }, [dispatch]);

  return (
    <>
      <main>
        <h1> Admin Panel</h1>

        <input type="text" placeholder="search" />

        <span>
          {" "}
          <p>Ticket codes</p>{" "}
        </span>
        {codes && codes.length > 0 ? (
          codes.map((data) => (
            <span>
              <p key={data.uniqueCode}> {data.uniqueCode} </p>
            </span>
          ))
        ) : (
          <p>No codes available</p>
        )}
      </main>
    </>
  );
};

export default Admin;
