import { Box, Button } from "@mui/material";
import whatsapp from "../assets/whatsapp.svg";
import emailjs from "emailjs-com";
import "./StudentForm.css";
import { useState } from "react";
function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    requirements: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_rgon1xj", // Replace with your service ID
        "template_qgnicvq", // Replace with your template ID
        e.target,
        "gzQMH2z9L1RZ6gGim" // Replace with your user ID
      )
      .then((result) => {
        console.log(result.text);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error(error.text);
        alert("There was an error submitting the form.");
      });
  };
  return (
    <Box className="student_form_container">
      <Box className="student_heading">
        Whatever your printing requirements are, <br /> we will get it done and
        delivered to you.
      </Box>
      <Box className="assignment_container">
        <Box className="item" textAlign={"right"}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="assignment_textField"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
            <input
              type="number"
              className="assignment_textField"
              value={formData.number}
              name="number"
              onChange={handleInputChange}
              placeholder="Enter your number"
              required
            />

            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              className="assignment_textField"
              placeholder="Enter your email"
              required
            />

            <input
              type="text"
              value={formData.requirements}
              name="requirements"
              onChange={handleInputChange}
              className="assignment_textField"
              placeholder="What are you looking for"
              required
            />
            <Button variant="contained" className="submit_btn">
              Submit
            </Button>
          </form>
        </Box>
        <Box className="item seperator" fontWeight={"bold"}>
          -Or-
        </Box>
        <Box className="item whatsapp_updates" textAlign={"center"}>
          <Box>WhatsApp us your requirements</Box>
          <img src={whatsapp} alt="whatsapp" />
        </Box>
      </Box>
    </Box>
  );
}

export default StudentForm;
