import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { popularRoutes } from "../../../actions/profile";
import { getTickets } from "../../../actions/profile";
import { updatePrice } from "../../../actions/profile";

const EditPrice = () => {
  const dispatch = useDispatch();

  const busRoutes = useSelector((state) => state.profile.popularRoutes) || [];
  const bookedTickets = useSelector((state) => state.profile.getTickets) || [];
  const codes = useSelector((state) => state.profile.ticket_codes);
  const [updatedPrice, setUpdatedPrice] = useState("");

  //popular routes
  useEffect(() => {
    dispatch(popularRoutes());
  }, [dispatch]);

  const ID = localStorage.getItem("id");
  const id = Number(ID);
  const filterByid = busRoutes.filter((route) => route.id === id);

  //   console.log(filterByid);

  const handleEditpirce = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Click ok to update Price");
    if (confirm) {
      const priceInfor = {
        price: updatedPrice,
        id: ID,
      };
      dispatch(updatePrice(priceInfor)); //pass to axis in action/profile
    }
  };
  const isButtonDisable = !updatedPrice || !id;

  return (
    <>
      {filterByid &&
        filterByid.map((route) => {
          return (
            <>
              <div key={route.id} className="h-96 p-3">
                <button className="mt-2 flex items-center space-x-1">
                  <Link to={"/admin_dashboard"}>
                    <img
                      class="w-5 transition-all duration-2000 hover:scale-110"
                      src="/back-button-svgrepo-com.svg"
                      title="back button"
                    />
                  </Link>
                  <span>dashboard</span>
                </button>

                <h1 className="text-center text-3xl font-bold">Update Price</h1>
                <p className="text-center text-2xl mt-2">{route.stops + " "}</p>

                <p className="text-center mt-1" key={route.id}>
                  Price :<span className="text-green-600">K{route.price}</span>
                </p>
                <div className="flex justify-center">
                  <input
                    className="bg-gray-200 rounded-md p-1"
                    type="text"
                    id={route.id}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                  />

                  <button
                    onClick={handleEditpirce}
                    className="ml-1"
                    type="submit"
                    disabled={isButtonDisable}
                  >
                    <em className="rounded-md bg-orange-500 p-2 text-white">
                      edit
                    </em>
                  </button>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default EditPrice;