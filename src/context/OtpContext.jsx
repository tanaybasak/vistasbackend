import PropTypes from 'prop-types';
import  { createContext, useContext, useEffect, useState } from 'react';

// Create a Context for OTP verification status
const OtpContext = createContext();

// Custom hook to use OTP context
// eslint-disable-next-line react-refresh/only-export-components
export const useOtpContext = () => useContext(OtpContext);

// Provider component to wrap your app
export const OtpProvider = ({ children }) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    // Check localStorage on initial load to see if OTP is verified
    const storedOtpVerified = localStorage.getItem('otpVerified');
    if (storedOtpVerified === 'true') {
      setOtpVerified(true);
    }
    setLoading(false);
  }, []);

  const verifyOtp = () => {
    setOtpVerified(true);
    sessionStorage.setItem('otpVerified', 'true'); // Store the status in localStorage
  };

  const clearOtpVerification = () => {
    setOtpVerified(false);
    sessionStorage.removeItem('otpVerified'); // Clear OTP verification status from localStorage
  };


  return (
    <OtpContext.Provider  value={{ otpVerified, verifyOtp, clearOtpVerification, loading }}>
      {children}
    </OtpContext.Provider>
  );
};

OtpProvider.propTypes = {
    children: PropTypes.node
}
