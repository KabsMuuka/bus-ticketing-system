import {
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
  //payments
  REQUEST_TO_PAY,
  VERIFY_PAYMENTS,
  //ADMIN
  TICKET_CODES,
} from "../actions/types";

const initialState = {
  //delete account
  delete_account: [],

  popularRoutes: [],
  profile: {}, //for GET_PROFILE, //expects user typeOf array
  profiles: [],
  repos: [],
  //mine
  requenttopay: [],
  verifypayment: [],
  savedTickets: [],
  getTickets: [], //should to be same as the in profile.js state.profile.getTickets
  remove_ticket: [],

  //ADMIN
  ticket_codes: [],

  //
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  //action has type imported above and payload has specific  res.data, defined in actions/profile.js
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
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
    default:
      return state;
  }
}

export default profileReducer;
