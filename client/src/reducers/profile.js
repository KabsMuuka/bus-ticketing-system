import {
  USER_LOADED,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_POPULAR_ROUTES,
  SAVE_TICKET,
  GET_TICKETS,
  REMOVE_TICKET,
  ACCOUNT_DELETED,
  GET_SEAT_1,
  GET_SEAT_2,
  GET_SEAT_3,
  //payments
  REQUEST_TO_PAY,
  VERIFY_PAYMENTS,
  //ADMIN
  TICKET_CODES,
  UPDATE_PRICE,
  GET_ALL_ROUTES,
} from "../actions/types";

const initialState = {
  //delete account
  delete_account: [],

  popularRoutes: [],
  profiles: [],
  repos: [],

  getCurrentUser: [],
  //mine

  getSeat_1: [],
  getSeat_2: [],
  getSeat_3: [],

  requenttopay: [],
  verifypayment: [],
  savedTickets: [],
  getTickets: [], //should to be same as the in profile.js state.profile.getTickets
  remove_ticket: [],

  //ADMIN
  ticket_codes: [],
  update_price: [],
  get_all_routes: [],
  //
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  //action has type imported above and payload has specific  res.data, defined in actions/profile.js
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        getCurrentUser: payload,
        loading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    //popular routes
    case GET_POPULAR_ROUTES:
      return {
        ...state,
        popularRoutes: payload,
        loading: false,
      };
    //making payments
    case REQUEST_TO_PAY:
      return {
        ...state,
        requenttopay: payload,
        loading: false,
      };
    case VERIFY_PAYMENTS:
      return {
        ...state,
        verifyPayment: payload,
        loading: false,
      };
    // save Ticket
    case SAVE_TICKET:
      return {
        ...state,
        savedTickets: payload,
        loading: false,
      };

    //get seat
    case GET_SEAT_1:
      return {
        ...state,
        getSeat_1: payload,
        loading: false,
      };

    //get seat 2
    case GET_SEAT_2:
      return {
        ...state,
        getSeat_2: payload,
        loading: false,
      };

    //get seat 3
    case GET_SEAT_3:
      return {
        ...state,
        getSeat_3: payload,
        loading: false,
      };

    //Get tickets
    case GET_TICKETS:
      return {
        ...state,
        getTickets: payload,
        loading: false,
      };
    //delete ticket from profile
    case REMOVE_TICKET:
      return {
        ...state,
        remove_ticket: payload,
        loading: false,
      };

    //delete account
    case ACCOUNT_DELETED:
      return {
        ...state,
        delete_account: payload,
        loading: false,
      };

    //ADMIN
    case TICKET_CODES:
      return {
        ...state,
        ticket_codes: payload,
        loading: false,
      };
    case UPDATE_PRICE:
      return {
        ...state,
        update_price: payload,
        loading: false,
      };

    case GET_ALL_ROUTES:
      return {
        ...state,
        get_all_routes: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
