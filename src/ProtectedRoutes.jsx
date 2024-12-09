import { Navigate } from 'react-router-dom';
import { useOtpContext } from './context/OtpContext';
import PropTypes from 'prop-types';
import Loading from './pages/Loading/Loading';

const ProtectedRoute = ({ element }) => {
    const { otpVerified, loading } = useOtpContext();
    console.log(otpVerified)

    if (loading) {
        return <Loading />;  // Optionally, show a loading spinner or message until context is loaded
      }
  
    // If OTP is not verified, redirect to /otp
    if (!otpVerified) {
      return <Navigate to="/login" />;
    }
  
    return element;
  };
ProtectedRoute.propTypes = {
    element: PropTypes.element
}

export default ProtectedRoute;
