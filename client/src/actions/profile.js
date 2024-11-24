import axios from "axios";
import { setAlert } from "./alert";

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  //MINE
  GET_POPULAR_ROUTES,
  SAVE_TICKET,
  GET_TICKETS,
  REMOVE_TICKET,
  STORE_SEAT,
  GET_SEAT_1,
  GET_SEAT_2,
  GET_SEAT_3,
  //MAKE PAYMENT
  REQUEST_TO_PAY,
  VERIFY_PAYMENTS,
  TICKET_CODES,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users");
    // console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeTicket = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/deleteTicket/${id}`);
    dispatch({
      type: REMOVE_TICKET,
      payload: { id },
    });

    dispatch(setAlert("Bus Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    // console.log(res.data[0].user)
    dispatch({
      type: GET_PROFILE,
      payload: res.data[0],
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    // console.log(res.data);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//CREATING PROFILE MAKE THE BACKEND FOR IT
export const createProfile =
  (FormData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", FormData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

export const addExperience = (FormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("api/profile/experience", FormData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const okok =
  ({ start, end }) =>
  async (dispatch) => {
    // console.log("hii");
  };

//search buses
export const searchBuses = ({ start, end }) => {
  // console.log("third")
  try {
    const res = axios.get(`/api/search/${start}/${end}`).then((hii) => {
      return hii.data;
    });
    return res;
    // dispatch({
    //     payload: res.data
    // })
    // console.log(res)
  } catch (err) {
    // const errors = err.response.data.errors
    // if (errors) {
    //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    // }
    console.log("error here", err);
  }
};
//get popular routes
export const popularRoutes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cities");

    dispatch({
      type: GET_POPULAR_ROUTES,
      payload: res.data,
    });
    return res;
  } catch (error) {
    console.error("Error fetching popular routes", error);
  }
};

//adding a TICKET
export const addTicket = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/bookedTicket/save", formData, config);

    dispatch({
      type: SAVE_TICKET,
      payload: res.data,
    });

    dispatch(setAlert("Ticket saved", "success"));
  } catch (err) {
    // Check if err.response exists and has the structure you expect
    const errors = err.response
      ? err.response.data.errors
      : [{ msg: "An error occurred" }];

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert("An unexpected error occurred", "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response
          ? err.response.statusText
          : "An unexpected error occurred",
        status: err.response ? err.response.status : 500,
      },
    });
  }
};
//Get tickets
export const getTickets = () => async (dispatch) => {
  const res = await axios.get("/api/getTickets");
  // console.log("gettickets", res);
  try {
    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletebuses = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/buses/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("buses Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//storing selected seats
export const storebus_firstBus = (seatId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/f1/seatNumber/${seatId}`);

    dispatch({
      type: STORE_SEAT,
      payload: res.data,
    });

    dispatch(setAlert("Seat number selected ", seatId));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//storing seats for second bus
export const storebus_secondBus = (seatId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/s2/seatNumber/${seatId}`);

    dispatch({
      type: STORE_SEAT,
      payload: res.data,
    });

    dispatch(setAlert("Seat number selected ", seatId));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//storing seats for third bus
export const storebus_thirdBus = (seatId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/t3/seatNumber/${seatId}`);

    dispatch({
      type: STORE_SEAT,
      payload: res.data,
    });

    dispatch(setAlert("Seat number selected ", seatId));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET SEATS

//storing selected seats
export const GetReservedSeats_firstBus = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/f1/storedSeats`);

    // console.log("firstbus ", res.data);
    dispatch({
      type: GET_SEAT_1,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//getseats for 2 second bus
export const GetReservedSeats_secondbus = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/s2/storedSeats`);

    dispatch({
      type: GET_SEAT_2,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//get seats for third bus
export const GetReservedSeats_thirdbus = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/t3/storedSeats`);

    dispatch({
      type: GET_SEAT_3,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/deleteAccount/${id}`);
    dispatch({
      type: ACCOUNT_DELETED,
      payload: res.data,
    });
    dispatch(setAlert("Your account has been permanently Deleted"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//MAKING PAYMENT

//adding a TICKET
export const requesttopay = (PayInfo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/requesttopay", PayInfo, config);

    dispatch({
      type: REQUEST_TO_PAY,
      payload: res.data,
    });

    dispatch(setAlert("Processing Payment"));
  } catch (err) {
    // Check if err.response exists and has the structure you expect
    // const errors = err.response
    //   ? err.response.data.errors
    //   : [{ msg: "An error occurred" }];    in future, with error from mtn

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response
          ? err.response.statusText
          : "An unexpected error occurred",
        status: err.response ? err.response.status : 500,
      },
    });
  }
};

//PAYMENT VERIFICATION
export const verifyPayment = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/verifyPayments");
    // console.log(res);
    return res.data; //only using this
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//
//ADMIN
//PAYMENT VERIFICATION
export const ticket_codes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin");
    dispatch({
      type: TICKET_CODES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//
