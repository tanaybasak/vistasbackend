import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import "./Form.css";
import Drag from "../Drag";
import ChipItem from "../ChipItem";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from "prop-types";
import { useState } from "react";

function Form({ category_one, category_two }) {
    const [quantity, setQuantity] = useState(10);
    const [total, setTotal] = useState(200);

    const updateTotal = (newQuantity) => {
        setTotal(newQuantity * 20); // ₹20 per unit
    };
    const handleSubQuantity = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = Math.max(10, prevQuantity - 10);
            updateTotal(newQuantity); // Update total based on new quantity
            return newQuantity;
        });
    };

    const handleAddQuantity = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 10;
            updateTotal(newQuantity); // Update total based on new quantity
            return newQuantity;
        });
    };
    return (
        <Box className="form">
            <Typography className="form_heading" gutterBottom>
                VISITING CARD
            </Typography>
            <Box className="form_subtitle">
                <Typography variant="subtitle1 form_sub" gutterBottom>Rectangle: 9*5cm</Typography>
                <Typography variant="subtitle1 form_sub" gutterBottom>Square: 6*6cm </Typography>
                <Typography variant="subtitle1 form_sub" gutterBottom>Custom: Call 9835302232 </Typography>
            </Box>
            <Box className="drag_design_upload">
                <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                    Upload your design:{" "}
                </Typography>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 6, md: 4 }}>
                        <Drag
                            label="Drag and drop or"
                            buttonlabel="Choose File"
                            bgcls="drag_drop"
                            buttonCls="drag_btn"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 4 }}>
                        <Drag
                            label="Don't have a design"
                            buttonlabel="Get a designer"
                            bgcls="design"
                            buttonCls="design_btn"
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 4 }}></Grid2>
                </Grid2>
            </Box>
            <Box className="drag_design_upload">
                <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                    Choose Texture
                </Typography>
                <Stack className="texture chip_tags">
                    {category_one.length > 0 &&
                        category_one.map((item) => (
                            <Box key={item.id}>
                                <ChipItem selected={item.selected} label={item.name} />
                            </Box>
                        ))}
                </Stack>
            </Box>
            <Box className="drag_design_upload">
                <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                    Corners
                </Typography>
                <Stack className="corners chip_tags">
                    {category_two.length > 0 &&
                        category_two.map((item) => (
                            <Box key={item.id}>
                                <ChipItem selected={item.selected} label={item.name} />
                            </Box>
                        ))}
                </Stack>
            </Box>
            <Box className="drag_design_upload">
                <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                    Quantity
                </Typography>
                <Stack className="quantity chip_tags">
                    <Button variant="outlined" className="remove_btn" onClick={handleSubQuantity}> <RemoveIcon /> </Button>
                    <input type="number" className="quantity" value={quantity} />
                    <Button variant="outlined" className="add_btn" onClick={handleAddQuantity}> <AddIcon /> </Button>
                </Stack>
            </Box>
            <Box className="drag_design_upload">
                <Typography variant="subtitle1" fontWeight={'bold'} gutterBottom>
                    Price
                </Typography>
                <Typography variant="subtitle1" className="price" fontWeight={'bold'} gutterBottom>
                    &#8377;{total} 
                </Typography>
            </Box>
            <Box className="drag_design_upload">
                <Button variant="contained" className="print_btn"> Print my visiting card</Button>
            </Box>
        </Box>
    );
}

Form.propTypes = {
    category_one: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    category_two: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Form;
