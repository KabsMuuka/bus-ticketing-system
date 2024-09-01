import { createStore, applyMiddleware } from "redux"; // Importing necessary functions from Redux
import { composeWithDevTools } from "@redux-devtools/extension"; // Importing Redux DevTools integration
import { thunk } from "redux-thunk"; // Importing thunk middleware for asynchronous actions
import rootReducer from "./reducers"; // Importing the root reducer which combines all reducers

const initialState = {}; // Initial state of the Redux store, often an empty object

const middleware = [thunk]; // Middleware array, currently only including thunk

// Creating the Redux store with rootReducer, initialState, and applying middleware with DevTools integration
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; // Exporting the store to be used in the application
