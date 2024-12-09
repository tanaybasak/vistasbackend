import React, { useState } from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";

const Address = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    house: "",
    apartment: "",
    city: "",
    pincode: "",
  });

  const [isValidPincode, setIsValidPincode] = useState(false);

  const handleInputChange = (field, value) => {
    const updatedValues = { ...formValues, [field]: value };
    setFormValues(updatedValues);

    if (field === "pincode") {
      // Validate pincode (should be 6 digits)
      const pincodeRegex = /^[0-9]{6}$/;
      setIsValidPincode(pincodeRegex.test(value));
    }
  };

  const isFormValid =
    Object.values(formValues).every((value) => value.trim() !== "") &&
    isValidPincode;


  const handleContinue = () => {
    if(isFormValid)
    navigate('/order')
  };

  return (
    <Box className="address-page">
      <Box className="address-box">
        <Typography variant="h5" className="address-heading">
          ENTER YOUR ADDRESS
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="address-subtitle"
        >
          Your ordered will be delivered in the above <br/> mentioned address
        </Typography>

        <Box className="address_content">
          <InputField
            placeholder="House / Flat / Floor Number*"
            type="text"
            onChange={(e) => handleInputChange("house", e.target.value)}
            className="address_text"
          />
          <InputField
            placeholder="Apartment / Road / Area*"
            onChange={(e) => handleInputChange("apartment", e.target.value)}
            type="text"
            className="address_text"
          />
           <InputField
            placeholder="City / State*"
            onChange={(e) => handleInputChange("city", e.target.value)}
            type="text"
            className="address_text"
          />
           <InputField
            placeholder="Pin code*"
            type="number"
            className="address_text"
            onChange={(e) => handleInputChange("pincode", e.target.value)}
          />

        <Button
          variant="contained"
          className="continue-button address_btn"
          onClick={handleContinue}
          disabled={!isFormValid}
          fullWidth
        >
          Continue
        </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default Address;
