import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { login } from "../../actions/auth";
import Spinner from "../layout/Spinner";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ7WXIlI_jHoDI0SvpegR5nLmYscP29Cs",
  authDomain: "sagita-ffcc5.firebaseapp.com",
  projectId: "sagita-ffcc5",
  storageBucket: "sagita-ffcc5.firebasestorage.app",
  messagingSenderId: "518705465297",
  appId: "1:518705465297:web:6b4213b9469e5f4a7b42f0",
  measurementId: "G-ZVKWD22R63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  //google auth
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider); // Await the promise to handle success/failure properly
      navigate("/dashboard"); // Navigate after successful sign-in
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.error(
          "Popup request canceled due to another popup being opened."
        );
      } else if (error.code === "auth/popup-closed-by-user") {
        console.error(
          "Popup was closed by the user before completing the sign-in."
        );
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };
  //google auth

  return (
    <div>
      <Link to={"/feedback"}>
        <p className="text-blue-700 flex justify-end visited:text-purple-500">
          Tell us what you think
        </p>{" "}
      </Link>
      <button className="mt-2 flex items-center space-x-1">
        <Link to={"/"}>
          <img
            class="w-5 transition-all duration-2000 hover:scale-110"
            src="/back-button-svgrepo-com.svg"
            title="back button"
          />
        </Link>
        <span>home</span>
      </button>

      <div className="flex items-center justify-center mt-2 mb-2 ">
        <div className="rounded-lg shadow-lg p-8 w-full max-w-md">
          <h3 className="text-2xl font-bold text-center mb-4">
            Sign in to your account
          </h3>

          <p className="text-sm text-center mb-4">
            New to online powerTools?{" "}
            <Link className="underline" to={"/register"}>
              {" "}
              create account
            </Link>
          </p>

          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="flex items-center justify-center bg-red-500 text-white rounded-full p-2 cursor-pointer">
              <button onClick={signInWithGoogle}>
                <FaGoogle />
              </button>
            </div>
          </div>

          <form
            className="flex items-center flex-col justify-center "
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="mb-4">{loading && <Spinner />}</div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                required
                className="input text-black bg-slate-200 input-bordered w-full max-w-xs"
                name="email"
                placeholder="example@gmail.com"
                value={email}
                type="email"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                required
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                className="input bg-slate-200 input-bordered w-full max-w-xs"
                onChange={(e) => onChange(e)}
              />

              <div className="mb-4">
                <input
                  required
                  type="submit"
                  value="Login"
                  className="mt-2 bg-blue-500 rounded py-2 w-full cursor-pointer hover:bg-blue-600 transition duration-200"
                />
              </div>
            </div>

            <div className="text-center">
              <small>
                <Link
                  to="/admin_login"
                  className="text-blue-500 hover:underline"
                >
                  Login as Admin
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
