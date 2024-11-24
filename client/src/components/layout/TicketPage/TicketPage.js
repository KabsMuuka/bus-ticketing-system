import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTicket } from "../../../actions/profile";
import styles from "./TicketPage.module.css"; // Import your CSS module

export default function TicketPage() {
  const dispatch = useDispatch();
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    const uniqueCode = localStorage.getItem("uniqueCode");
    if (uniqueCode) {
      setQrSrc(
        `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${uniqueCode}`
      );
    }
  }, []);

  useEffect(() => {
    const saveData = () => {
      const formData = {
        passengerName: JSON.parse(localStorage.getItem("passengerName")) || [],
        currentUserId: localStorage.getItem("currentUserId"),
        from: localStorage.getItem("start"),
        to: localStorage.getItem("destination"),
        price: localStorage.getItem("price"),
        reservedSeats: localStorage.getItem("reservedSeats"),
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
  };

  const getPassengerNames = () => {
    const passengerName =
      JSON.parse(localStorage.getItem("passengerName")) || [];
    return passengerName.length > 0 ? (
      passengerName.map((name, idx) => (
        <span key={idx} className={styles.name}>
          {name}
        </span>
      ))
    ) : (
      <p>No passenger names available</p>
    );
  };

  const getSeatNumbers = () => (
    <span className={styles.seatNo}>
      {localStorage.getItem("reservedSeats")}
    </span>
  );

  const getPrice = () => (
    <span className={styles.price}>{localStorage.getItem("price")}</span>
  );

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
              <h3>Seat Number: {getSeatNumbers()}</h3>
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
