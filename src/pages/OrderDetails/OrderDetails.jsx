import {
    Box,
    Typography,
    Button,
    Table,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    Paper,
} from "@mui/material";
import "./Order.css";

const OrderDetails = () => {
    const handleContinue = () => { };
    const rows = [
        { name: "Visiting Card * 100, Texture: Matte,Corners: Standard", price: 200 },
        { name: "Delivery charges", price: 50 },
        { name: "GST 5%", price: 12.5 },
        { name: "Total", price: 262.5, className: "total_price" },
    ];

    return (
        <Box className="order-page">
            <Box className="order-box">
                <Typography variant="h5" className="order-heading">
                    ORDER DETAILS
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className="order-subtitle"
                >
                    Address: T5B - 3C, Priya Exotica, Kahilipara, Guwahati, 781019{" "}
                </Typography>

                <Box className="order_content">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name} className="table_row">
                                        {/* Handle first row differently */}
                                        {index === 0 ? (
                                            <>
                                                <TableCell className="table_content">
                                                    {row.name.split(",").map((item, idx) => (
                                                        <div key={idx} className="tableitems">{item.trim()}</div> // Each item on a new line
                                                    ))}
                                                </TableCell>
                                                <TableCell className="table_content">
                                                &#8377;{row.price} {/* Price */}
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell className={`table_content ${row.className}`}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell className={`table_content ${row.className}`}>
                                                &#8377;{row.price}
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        variant="contained"
                        className="continue-button order_btn"
                        onClick={handleContinue}
                        fullWidth
                    >
                        Pay
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default OrderDetails;
