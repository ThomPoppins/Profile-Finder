import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
  // handleSubmit function to execute when the form is submitted
  const handleSubmit = () => {
    console.log("submitted");
  };

  // handleChange function to execute when a form field is changed
  const handleChange = () => {
    console.log("changed");
  };

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
              value={""}
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
                value={""}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                require={true}
                value={""}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYYY"
                require={true}
                value={""}
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
                checked={false}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                require={true}
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                require={true}
                value="more"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={false}
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
                checked={false}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                require={true}
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="man-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                require={true}
                value="everyone"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="more-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id-="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={""}
              onChange={handleChange}
            />
            <input type="submit" />
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
            <div className="photo-container"></div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
