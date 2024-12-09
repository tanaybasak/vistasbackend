import { Box, Typography, Button } from "@mui/material";
import "./Login.css";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AlertComponent from "../../components/Alert";

const Login = () => {
  const [phoneNumber, setPhone] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const navigate = useNavigate();



  const validatePhoneNumber = (number) => {
    // Regex to validate Indian phone number with +91
    const regex = /^\+91[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.trim();

    // Ensure "+91" is always present at the start
    if (!value.startsWith("+91")) {
      value = `+91${value.replace(/^\+91/, "")}`;
    }

    setPhone(value);
    setIsPhoneValid(validatePhoneNumber(value));
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
    try {
      const response = await axios.post("https://vistasbackend.vercel.app/send-otp", {
        phoneNumber,
      });
      if (response.data.success) {
        handleShowAlert("Otp sent successfully!", "success");
        setTimeout(() => {
          navigate("/otp", { state: { phoneNumber } });
        }, 2000);
      }
    } catch (error) {
      handleShowAlert("Failed to send OTP", "failure");
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-box">
        <Typography variant="h5" className="login-heading">
          LOGIN or SIGNUP
        </Typography>

        <Box className="login_content">
          <InputField
            placeholder="+91 | Mobile Number*"
            type="text"
            className="login_text"
            onChange={handlePhoneChange}
            value={phoneNumber}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className="login-subtitle"
          >
            By continuing, I agree to the Terms of use & Privacy policy
          </Typography>

          <Button
            variant="contained"
            className="continue-button login_button"
            onClick={handleContinue}
            disabled={!isPhoneValid} // Button is enabled only if phone number is valid
            fullWidth
          >
            Continue
          </Button>
        </Box>
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

export default Login;
