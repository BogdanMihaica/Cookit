import React from "react";
import "./Contact.css";
import { Navbar } from "../Navbar/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-title">Contact</h1>
        <form className="contact-form">
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            required
          />
          <textarea
            placeholder="Your Message"
            className="contact-textarea"
            required
          ></textarea>
          <button type="submit" className="contact-submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
