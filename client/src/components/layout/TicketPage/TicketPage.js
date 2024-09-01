import { React, useEffect, useState } from "react";
import "./TicketPage.css";
import { addTicket } from "../../../actions/profile";
//use the useDispatch hook from react-redux to dispatch actions.
import { useDispatch } from "react-redux";

export default function TicketPage() {
  //  Update your component to use useDispatch for dispatching
  // actions and ensure proper use of the useEffect hook.
  const dispatch = useDispatch(); //now simply wrap addTicket using dispatch

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
      let passengerName = localStorage.getItem("nameData");
      let reservedSeats = localStorage.getItem("reservedSeats");
      // let selectedBusId = localStorage.getItem("selectedBusId");
      let date = localStorage.getItem("date");
      let time = localStorage.getItem("time");
      let busPosition = localStorage.getItem("busPosition");
      let uniqueCode = localStorage.getItem("uniqueCode");

      if (
        !from ||
        !to ||
        !passengerName ||
        !reservedSeats ||
        !time ||
        !date ||
        !busPosition ||
        !uniqueCode
      ) {
        console.error(
          "One or more required fields are missing in localStorage"
        );
      }

      //add QR CODE
      const formDATEa = {
        passengerName,
        from,
        to,
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
          <strong>From: </strong> {from}
        </span>
        <span>
          <strong>To: </strong> {to}
        </span>
      </div>
    );
  };
  const getPassengerName = () => {
    let passengerName = localStorage.getItem("nameData");
    if (!passengerName) {
      return <p>No passenger names available</p>;
    }
    let names = JSON.parse(passengerName);
    return names.map((name, idx) => {
      return (
        <div key={idx}>
          <p className="names">{name}</p>
        </div>
      );
    });
  };
  const getSeatNumbers = () => {
    let reservedSeats = localStorage.getItem("reservedSeats");
    let arr = JSON.parse(reservedSeats);
    return arr.map((reservedSeats, idx) => {
      return (
        <div key={idx}>
          <p className="seatNo">{reservedSeats}</p>
        </div>
      );
    });
  };
  const getIdNumber = () => {
    // let selectedBusId = localStorage.getItem("selectedBusId");
    // return <p className="idDATEa">{selectedBusId}</p>;
  };
  const getDATEeValue = () => {
    let DATE = localStorage.getItem("date");
    let time = localStorage.getItem("time");
    return (
      <p>
        <strong> On: </strong>
        {DATE}, StartOff Time <strong>{time}</strong> Hours
      </p>
    );
  };
  // const getUniqueCodeValue = () => {
  //   let uniqueCode = localStorage.getItem("uniqueCode");
  //   return (
  //     <p>
  //       TicketCode <strong>{uniqueCode}</strong>
  //       <p>Do Not Share</p>
  //     </p>
  //   );
  // };

  // const getQRCode = () => {
  //   return (
  //     <p>
  //       QRCode
  //       <img id="qrImage" src={qrSrc} alt="QR Code" />
  //     </p>
  //   );
  // };

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
              <h3>Seat Numbers</h3>
              {getSeatNumbers()}
              <p>
                Have a nice journey. <span>{getDATEeValue()}</span>
              </p>
            </section>

            <section className="ticket__section">
              <h3>Passenger Names</h3>
              {getPassengerName()}
            </section>
            <section className="ticket__section">
              <h3>Payment Method</h3>
              <p>Mobile Money</p>
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
