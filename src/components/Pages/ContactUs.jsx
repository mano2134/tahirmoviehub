import { motion } from "motion/react";
import { useState } from "react";
import fadeInUp from "../Animation/FadeInUp";

const ContactUs = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
  });
  let handLeformChange = (e) => {
    let { name, value } = e.target;
    setformData((pre) => ({ ...pre, [name]: value }));
  };
  let handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setformData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">
      <motion.div className="contact-container"
      variants={fadeInUp(0.7)} 
      initial="hidden"
      animate="visible"
      >
        <h2>Get in Touch</h2>

        <form className="form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => handLeformChange(e)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => handLeformChange(e)}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => handLeformChange(e)}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
