import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "man",
    email: "",
    url: "",
    about: "",
    matches: [],
  });

  // handleSubmit function to execute when the form is submitted
  const handleSubmit = () => {
    console.log("submitted");
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
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
              <img src={formData.url} alt="profile pic review" />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
