import { Link } from "react-router-dom";
import "./network-service.css";
import { useState } from "react";

const NetworkCard = ({
  linkTo,
  imageSrc,
  altText,
  networkName,
  maxAmount,
  bgColor,
  textColor,
}) => (
  <div className={`network-individual ${bgColor}`} style={{ color: textColor }}>
    <Link to={linkTo} aria-label={`Go to ${networkName} page`}>
      <img className="networkSevice" src={imageSrc} alt={altText} />
    </Link>
    <div className="label-container">
      <label className="label-network">{networkName}</label>
      <label className="label-network">Max: {maxAmount}</label>
    </div>
    <label className="arrow">
      <img className="arrow-icon" src="/arrow.png" alt="arrow" />
    </label>
  </div>
);

export default function Pay() {
  const [price, setPrice] = useState(localStorage.getItem("price"));

  console.log("price", price);
  return (
    <div className="networkContainer h-96">
      {/* Removed form tag if it's not being utilized */}
      <NetworkCard
        linkTo="/airtel"
        imageSrc="/airtel-png.png"
        altText="Airtel"
        networkName="Airtel"
        maxAmount={price}
        bgColor="bg-airtel"
        textColor="white"
      />
      <NetworkCard
        linkTo="/mtn"
        imageSrc="/mtn-logo.svg"
        altText="MTN"
        networkName="MTN"
        maxAmount={price}
        bgColor="bg-mtn"
        textColor="black"
      />
      <NetworkCard
        linkTo="/zamtel"
        imageSrc="/zamtel.png"
        altText="Zamtel"
        networkName="Zamtel"
        maxAmount={price}
        bgColor="bg-zamtel"
        textColor="white"
      />
    </div>
  );
}
