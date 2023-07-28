import { useState } from "react";
import Nav from "../components/Nav";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// TODO: translate this page to Dutch, or make it dynamic multilingual
const OnBoarding = () => {
  // useNavigate is a function that is used to navigate to a different page
  let navigate = useNavigate();
  // cookies is an object that is used to set cookies
  const cookies = new Cookies();
  // auth_token is a variable that stores the token
  const auth_token = cookies.get("auth_token");
  // state variable that stores the form data
  const [formData, setFormData] = useState({
    user_id: cookies.get("user_id"),
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "man",
    email: cookies.get("email"),
    url: "",
    about: "",
    matches: [],
  });

  // handleSubmit function to execute when the form is submitted
  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    console.log("FORMDATA BEFORE /user PUT API CALL:::::::", formData);
    try {
      // update logged in user in the database with the form data
      const response = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/user",
        {
          formData,
        }
      );
      console.log("FORMDATA AFTER /user PUT API CALL::::::::", formData);
      console.log("RESPONSE:", response);
      // if the response is successful, 200 or 201, redirect to the dashboard
      if ((await response.status) === 200 || 201) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      // TODO: better error handling: https://www.developerway.com/posts/how-to-handle-errors-in-react
      console.log(error);
    }
  };

  // handleChange function to execute when a form field is changed
  const handleChange = (e) => {
    console.log("e", e);
    // e.target is the element that triggered the event
    // e.target.value is the value of the element that triggered the event
    // if the element is a checkbox, the value is e.target.checked
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // e.target.name is the name of the element that triggered the event
    const name = e.target.name;
    console.log("value: " + value, "name: " + name);

    // setFormData is a function that updates the state formData
    // it takes an object as an argument
    // the object is the new state we want to set
    // we use the spread operator to spread the previous state
    // and then we add the new key value pair
    // brackets are used to make the key dynamic
    // [name] is the name of the element that triggered the event
    // value is the value of the element that triggered the event
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // TODO: remove the following console.log
  console.log(formData);

  // TODO: add a date picker library
  // TODO: add a file upload library
  return (
    <>
      {/* TODO: add a checkbox inside the  sign up and /onboarding form to accept the terms and conditions*/}
      {/* TODO: navigate trough website in the navigation bar, in something like a menu or buttons*/}
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      {/* TODO: add a form validation library (Formik) */}
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              require={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label htmlFor="dob_day">Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                require={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                require={true}
                value={formData.dov_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                require={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="gender">Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                require={true}
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"} // if the value of the radio button is equal to the value of the state, then it is checked
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                require={true}
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"} // if the value of the radio button is equal to the value of the state, then it is checked
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                require={true}
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"} // if the value of the radio button is equal to the value of the state, then it is checked
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                require={true}
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                require={true}
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                require={true}
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id-="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </section>

          <section>
            <label htmlFor="about">Profile photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
