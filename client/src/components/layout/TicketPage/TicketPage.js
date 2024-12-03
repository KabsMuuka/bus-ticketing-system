import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTicket } from "../../../actions/profile";
import styles from "./TicketPage.module.css"; // Import your CSS module
import { getCurrentProfile } from "../../../actions/profile";

export default function TicketPage() {
  const dispatch = useDispatch();
  const [qrSrc, setQrSrc] = useState("");
  const [price, setPrice] = useState("");
  const getcurrentUser = useSelector((state) => state.profile.getCurrentUser);

  // Retrieve and parse passenger names
  const passNames = localStorage.getItem("passengerNames");
  const parsedNames = passNames ? JSON.parse(passNames) : {}; // Parse safely

  // Count the number of passengers
  const count = Object.keys(parsedNames).length; // Count the number of keys

  // Retrieve and parse price
  const calculatePrice = localStorage.getItem("price");
  const numPrice = Number(calculatePrice); // Convert price to a number

  // Calculate the final price
  const finalPrice = count * numPrice;
  // Calculate the final price
  const savePriceToDB = finalPrice.toString();

  console.log(finalPrice);
  useEffect(() => {
    const uniqueCode = localStorage.getItem("uniqueCode");
    if (uniqueCode) {
      setQrSrc(
        `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${uniqueCode}`
      );
    }
  }, []);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    const saveData = () => {
      const formData = {
        passengerName: localStorage.getItem("passengerNames"),
        currentUserId: localStorage.getItem("currentUserId"),
        from: localStorage.getItem("start"),
        to: localStorage.getItem("destination"),
        price: savePriceToDB,
        time: localStorage.getItem("time"),
        date: localStorage.getItem("date"),
        busPosition: localStorage.getItem("busPosition"),
        uniqueCode: localStorage.getItem("uniqueCode"),
      };

      if (Object.values(formData).some((value) => !value)) {
        console.error(
          "One or more required fields are missing in localStorage"
        );
        return;
      }

      dispatch(addTicket(formData));
    };
    saveData();
  }, [dispatch]);

  const getLocationData = () => {
    const busPosition = localStorage.getItem("busPosition");
    const from = localStorage.getItem("start");
    const to = localStorage.getItem("destination");

    if (from && to) {
      return (
        <div className={styles.locationData}>
          <h2>{busPosition}</h2>
          <p>
            <strong>From:</strong> {from}
          </p>
          <p>
            <strong>Destination:</strong> {to}
          </p>
        </div>
      );
    } else {
      const stops = localStorage.getItem("stops");

      return (
        <div className={styles.locationData}>
          <h2>{busPosition}</h2>
          <p>
            <strong>Routes: </strong> {stops.join("-")}
          </p>
        </div>
      );
    }
  };

  const getPassengerNames = () => {
    const passengerData = localStorage.getItem("passengerNames");

    // Parse the stored data safely
    let passengers = {};
    try {
      passengers = passengerData ? JSON.parse(passengerData) : {};
    } catch (error) {
      console.error("Error parsing passenger data:", error);
    }

    // Ensure passengers is a valid object
    if (Object.keys(passengers).length === 0) {
      return <p>No passenger names available</p>;
    }

    // Map through the object to render seat numbers and names
    return (
      <ul>
        {Object.entries(passengers).map(([seat, name], index) => (
          <li key={index} className="mb-2">
            <span className="font-bold">Seat: {seat}</span> -{" "}
            <span>Name: {name}</span>
          </li>
        ))}
      </ul>
    );
  };

  const getPrice = () => <span className={styles.price}>{finalPrice}</span>;

  const getDateTime = () => {
    const date = localStorage.getItem("date");
    const time = localStorage.getItem("time");
    return (
      <span>
        <em>Date:</em> {date}
        <br />
        <em>Start Time:</em> {time} Hours
      </span>
    );
  };

  const printTicket = () => {
    window.print();
  };

  return (
    <div>
      {/* back button  */}
      <button className="mt-2">
        <Link to={"/"}>
          <img
            class="w-7 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
      </button>
      {/* back button  */}

      <div className={styles.container}>
        <article className={styles.ticket}>
          <header className={styles.ticketHeader}>🎟 PowerTools 🎟</header>
          <div className={styles.ticketBody}>
            <section className={styles.ticketSection}>
              <h3>QR Code</h3>
              <img src={qrSrc} alt="QR Code" className={styles.qrCode} />
            </section>
            <section className={styles.ticketSection}>
              {getLocationData()}
              <p>{getDateTime()}</p>
            </section>
            <section className={styles.ticketSection}>
              <h3>Name: {getPassengerNames()}</h3>
            </section>
            <section className={styles.ticketSection}>
              <h3>Price: K{getPrice()}</h3>
            </section>
            <section className={styles.ticketSection}>
              <h3>Payment Method</h3>
              <p>Mobile Money</p>
              <br />
              <p>Have a nice journey!</p>
            </section>
          </div>
          <footer className={styles.ticketFooter}>
            <button className={styles.printButton} onClick={printTicket}>
              Print
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
