import { Box, Typography } from "@mui/material";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function CardBrand({ title, description, img }) {
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate('/branding/details');
  }
  return (
    <Box className="card" onClick={handleItemClick}>
      <img
        src={img}
        alt="Card"
        className="card_img"
      />
      <Box sx={{ marginTop: 2 }} className="card_text">
        <Typography
          variant="body1"
          fontWeight={"bold"}
          noWrap
          sx={{ border: "none" }}
          className="card_title"
        >
          {title}
        </Typography>
        <Typography variant="body2" noWrap sx={{ border: "none" }} className="card_subtitle">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

CardBrand.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
}
export default CardBrand;
