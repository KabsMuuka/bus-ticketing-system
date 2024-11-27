import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { popularRoutes } from "../../../actions/profile";
import { getAllRoutes } from "../../../actions/profile";

import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminPanel = ({ auth: { isAuthenticated }, logout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const busRoutes = useSelector((state) => state.profile.popularRoutes) || [];
  const AllBusRoutes = useSelector((state) => state.profile.get_all_routes);

  //popular routes
  useEffect(() => {
    dispatch(popularRoutes());
  }, [dispatch]);

  //popular routes
  useEffect(() => {
    dispatch(getAllRoutes());
  }, [dispatch]);

  const editPrice = () => {
    navigate("/editprice"); //navigate to edit page
  };
  const editPriceAll = () => {
    navigate("/editpriceAll"); //navigate to edit page
  };

  const BusInforCard = ({ route }) => {
    // popular routes
    return (
      <>
        <div className="shadow-md  rounded-md bg-white">
          <div className="p-4 flex-shrink-0" key={route.id}>
            <h3 className="font-bold text-xl">🎟 {route.busPosition} 🎟</h3>
            <p className="text-sm">Route: {route.stops.join(" - ")}</p>
            <p className="text-sm">Time: {route.time} Hours</p>
            <div>
              <p className="text-sm text-green-600">
                price : Price: K{route.price}
              </p>

              <div className="mt-2">
                <button
                  onClick={(e) => {
                    localStorage.setItem("id", route.id);
                    editPrice(e);
                  }}
                  className="p-1 bg-orange-600 rounded-md"
                >
                  Edit price
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <main className="p-2">
        {/* logout */}
        {isAuthenticated && (
          <Link to={"/login"} onClick={logout}>
            <span className="p-1 bg-red-600 rounded-md text-white">
              {" "}
              Logout
            </span>
          </Link>
        )}
        {/* logout */}
        <h1 className="text-center font-bold text-2xl p-3">Admin Panel</h1>
        <p className="text-center text-sm">
          <em>Access restricted to authorized personnel only</em>
        </p>
        {/* bookedTicket */}
        <p className="flex justify-end">
          <Link
            to={"/bookedtickets"}
            className="bg-orange-400 text-white p-1 m-1 rounded-md"
          >
            Booked Tickets
          </Link>
        </p>

        {/* bookedTicket */}

        <div className="flex flex-wrap gap-4 justify-center bg-slate-200 p-4 rounded-md">
          {busRoutes.map((route) => {
            return (
              <>
                <BusInforCard key={route.id} route={route} />
              </>
            );
          })}
        </div>

        <div>
          <div className="flex flex-wrap gap-4 justify-center bg-slate-200 p-4">
            {AllBusRoutes.flat().map((bus) => (
              <div
                key={bus.id}
                className="w-64 bg-white shadow-md p-4 rounded-md flex-shrink-0"
              >
                <h3 className="font-bold text-lg">{bus.busPosition}</h3>
                <p className="text-sm">
                  Route:{" "}
                  {Array.isArray(bus.stops)
                    ? bus.stops.join(" - ")
                    : "Invalid stops"}
                </p>
                <p className="text-sm">Time: {bus.time}</p>
                <p className="text-sm text-green-600">Price: K{bus.price}</p>

                <div className="mt-2">
                  <button
                    onClick={(e) => {
                      localStorage.setItem("id", bus.id);
                      editPriceAll(e);
                    }}
                    className="p-1 bg-orange-600 rounded-md"
                  >
                    Edit price
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

AdminPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AdminPanel);
