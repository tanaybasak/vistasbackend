import { Box, Typography, Button } from "@mui/material";
import "./Otp.css";
import InputField from "../../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import AlertComponent from "../../components/Alert";
import { useOtpContext } from "../../context/OtpContext";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const { phoneNumber } = location.state || {};
  const { verifyOtp } = useOtpContext();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(4).fill("")); // Initialize OTP as an array of empty strings

  const handleOtpChange = (index, e) => {
    const value = e.target.value;

    if (value.length > 1 || isNaN(value)) return; // Allow only single digits
    const newOtp = [...otp];
    newOtp[index] = value.charAt(0); // Ensure only the first digit is kept
    setOtp(newOtp);

    if (value !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus(); // Move to next input
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputsRef.current[index - 1].focus(); // Move focus back to the previous input
    }
  };

  const handleShowAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleContinue = async () => {
    const otpCode = otp.join(""); // Combine OTP digits into a single string
    try {
      const response = await axios.post("https://vistasbackend.vercel.app/verify-otp", {
        phoneNumber: phoneNumber,
        code: otpCode,
      });
      if (response.data.success) {
        verifyOtp(); // OTP verified, allow access to other routes
        handleShowAlert("OTP verified successfully!", "success");
        setTimeout(() => {
          navigate("/address");
        }, 2000);
      }
    } catch (error) {
      handleShowAlert("OTP verification failed!", "error");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== ""); // Check if all fields are filled


  return (
    <Box className="otp-page">
      <Box className="otp-box">
        <Typography variant="h5" className="otp-heading">
          VERIFY WITH OTP
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="otp-subtitle"
        >
          Sent to {phoneNumber}
        </Typography>
        <Box className="otp_content">
          {[...Array(4)].map((_, index) => (
            <InputField
              key={index}
              placeholder=""
              type="number"
              onChange={(e) => handleOtpChange(index, e)}
              inputref={(el) => (inputsRef.current[index] = el)}
              maxLength={1} // Restrict to one character
              onKeyDown={(e) => handleKeyDown(index, e)}
              classNames="otp_text"
            />
          ))}
        </Box>
        <Button
          variant="contained"
          className="continue-button otp_button"
          onClick={handleContinue}
          disabled={!isOtpComplete}
          fullWidth
        >
          Continue
        </Button>
      </Box>
      <AlertComponent
        message={alertMessage}
        severity={alertSeverity}
        open={alertOpen}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default Otp;
