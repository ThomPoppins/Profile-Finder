import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
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
            <div>
              <input
                id="man-gender-identity"
                type="radio"
                name="gender-dentity"
                require={true}
                value="man"
                onChange={handleChange}
                checked={false}
              />

              <input
                id="man-gender-identity"
                type="radio"
                name="gender-dentity"
                require={true}
                value="man"
                onChange={handleChange}
                checked={false}
              />

              <input
                id="more-gender-identity"
                type="radio"
                name="gender-dentity"
                require={true}
                value="more"
                onChange={handleChange}
                checked={false}
              />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
