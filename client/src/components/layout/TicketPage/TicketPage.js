import { React, useEffect, useState } from "react";
import "./TicketPage.css";
import { addTicket } from "../../../actions/profile";
//use the useDispatch hook from react-redux to dispatch actions.
import { useDispatch } from "react-redux";

export default function TicketPage() {
  //  Update your component to use useDispatch for dispatching
  // actions and ensure proper use of the useEffect hook.
  const dispatch = useDispatch(); //now simply wrap addTicket using dispatch

  console.log(localStorage);

  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    let uniqueCode = localStorage.getItem("uniqueCode");
    if (uniqueCode) {
      setQrSrc(
        "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" +
          uniqueCode
      );
    }
  }, []);

  useEffect(() => {
    const saveDATEa = () => {
      let from = localStorage.getItem("start");
      let to = localStorage.getItem("destination");
      let currentUserId = localStorage.getItem("currentUserId");
      let passengerName =
        JSON.parse(localStorage.getItem("passengerName")) || [];

      let reservedSeats = localStorage.getItem("reservedSeats");
      // let selectedBusId = localStorage.getItem("selectedBusId");
      let date = localStorage.getItem("date");
      let time = localStorage.getItem("time");
      let busPosition = localStorage.getItem("busPosition");
      let uniqueCode = localStorage.getItem("uniqueCode");
      let price = localStorage.getItem("price");

      console.log(price);
      if (
        !from ||
        !passengerName ||
        !to ||
        !reservedSeats ||
        !time ||
        !date ||
        !busPosition ||
        !uniqueCode ||
        !price
      ) {
        console.error(
          "One or more required fields are missing in localStorage"
        );
      }

      const formDATEa = {
        passengerName,
        currentUserId,
        from,
        to,
        price,
        reservedSeats,
        time,
        date,
        busPosition,
        uniqueCode,
      };

      dispatch(addTicket(formDATEa));
    };
    saveDATEa();
  }, [dispatch]);
  // console.log("ticket", localStorage); //testing
  const getLocationDATEa = () => {
    let busPosition = localStorage.getItem("busPosition");
    let from = localStorage.getItem("start");
    let to = localStorage.getItem("destination");

    return (
      <div>
        <span>
          <h2> {busPosition}</h2>
        </span>

        <span>
          <strong>From : </strong> {from}
        </span>
        <br />
        <span>
          <strong>Destination : </strong> {to}
        </span>
      </div>
    );
  };
  const getPassengerName = () => {
    let passengerName = localStorage.getItem("passengerName");
    if (!passengerName) {
      return <p>No passenger names available</p>;
    }
    let names = JSON.parse(passengerName);
    return names.map((name, idx) => {
      return (
        <span key={idx} className="names">
          {name}
        </span>
      );
    });
  };
  const getSeatNumbers = () => {
    let reservedSeats = localStorage.getItem("reservedSeats");
    return <span className="seatNo">{reservedSeats}</span>;
  };
  const getPrice = () => {
    let price = localStorage.getItem("price");
    return <span className="price">{price}</span>;
  };
  const getDATEeValue = () => {
    let DATE = localStorage.getItem("date");
    let time = localStorage.getItem("time");
    return (
      <span>
        <em>Date : </em>
        {DATE}
        <br />
        <em> StartOff Time :</em>
        {time} Hours
      </span>
    );
  };

  const printTicket = () => {
    window.print();
  };
  return (
    <div className="container">
      <div className="tpMain">
        <article className="ticket">
          <header className="ticket__wrapper">
            <div className="ticket__header">🎟 PowerTools 🎟</div>
          </header>
          <div className="ticket__divider">
            <div className="ticket__notch"></div>
            <div className="ticket__notch ticket__notch--right"></div>
          </div>
          <div className="ticket__body">
            <section className="ticket__section">
              <h3>QRcode</h3>
              <img id="qrImage" src={qrSrc} alt="QR Code" />
              {/* {getQRCode()} */}
            </section>

            <section className="ticket__section">
              {getLocationDATEa()}
              <h3>Seat Number : {getSeatNumbers()}</h3>
              <p>
                <span>{getDATEeValue()}</span>
              </p>
            </section>

            <section className="ticket__section">
              <h3>Name : {getPassengerName()}</h3>
            </section>
            <section className="ticket__section">
              <h3>Price : K{getPrice()}</h3>
            </section>
            <section className="ticket__section">
              <h3>Payment Method</h3>
              <p>Mobile Money</p>
              <br />
              Have a nice journey.
            </section>
          </div>
          <footer className="ticket__footer">
            <button className="btn btn-primary" onClick={printTicket}>
              {" "}
              Print{" "}
            </button>
          </footer>
        </article>
      </div>
    </div>
  );
}
