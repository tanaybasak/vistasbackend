import { Button, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from "prop-types";


const calculateQuantity = () => {}
const otherCal = () => {}
const Quantity = ({type="quanity"}) => {
    return  <Stack className="quantity chip_tags">
    <Button variant="outlined" className="remove_btn"> <RemoveIcon /> </Button>
    <input type="number" className="quantity" onClick={type == 'quantity'? calculateQuantity() : otherCal()} />
    <Button variant="outlined" className="add_btn"> <AddIcon /> </Button>
</Stack>
}

// Define prop types
Quantity.propTypes = {
    type: PropTypes.string.isRequired
  };

export default Quantity;