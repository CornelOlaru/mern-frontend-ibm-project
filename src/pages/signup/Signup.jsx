import React, { useEffect, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaInfoCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Validarea pentru user si parola
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showRetypedPassword, setShowRetypedPassword] = useState(true);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validConfirmedPass, setValidConfirmedPass] = useState(false);
  const [validConfirmedPassFocus, setValidConfirmedPassFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showPasswordFunction = () => {
    setShowPassword(!showPassword);
  };

  const showRetypedPasswordFunction = () => {
    setShowRetypedPassword(!showRetypedPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(formData.password));
  }, [formData.password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    // Check if passwords match
    setValidConfirmedPass(formData.password === confirmPassword);
  }, [formData.password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validPwd || !validEmail || !validConfirmedPass) {
      setErrorMessage("Please fill out the form correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login")
        return result;
      } else {
        setErrorMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
    }
  };

  return (
    <>
      <main>
        <Navbar />
        <div className="signup-container">
          <form onSubmit={handleSubmit} className="signup-form">
            <h1 className="form-title">Sign up</h1>

            {errorMessage && (
              <p className="error-message">
                <FaInfoCircle style={{ marginRight: "5px" }} />
                {errorMessage}
              </p>
            )}

            <div className="form-row">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
            </div>
            <p
              id="emailnote"
              className={emailFocus && !validEmail ? "instructions" : "offscreen"}
            >
              <FaInfoCircle style={{ marginRight: "5px" }} />
              Please enter a valid email address.
              <br />
              Example: user@example.com
            </p>
            <div className="form-row">
              <label className="form-label">Password</label>
              <div className="form-input">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  required
                />
                <span onClick={showPasswordFunction}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FaInfoCircle style={{ marginRight: "5px" }} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a special character.
              <br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
              <span aria-label="underscore">_</span>
            </p>
            <div className="form-row">
              <label className="form-label">Confirm Password</label>
              <div className="form-input">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showRetypedPassword ? "password" : "text"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setValidConfirmedPassFocus(true)}
                  onBlur={() => setValidConfirmedPassFocus(false)}
                  required
                />
                <span onClick={showRetypedPasswordFunction}>
                  {showRetypedPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
            </div>
            <p
              id="confpwdnote"
              className={
                validConfirmedPassFocus && !validConfirmedPass
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FaInfoCircle style={{ marginRight: "5px" }} />
              Passwords do not match!
            </p>
            <button
              className="form-button"
              type="submit"
              
            >
              Sign up
            </button>

            <Link className="login-link" to="/login">
              Already have an account?
            </Link>
          </form>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Signup;
