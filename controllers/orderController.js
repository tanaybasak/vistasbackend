const Razorpay = require("razorpay");
const connectToDatabase = require("../db/connection");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Replace with your Razorpay Key Secret
});

/**
 * Create a new user
 */
const createOrder = async(req, res) => {
    console.log(req.body);
    const { amount, userId } = req.body;
    if (!amount || !userId) {
        return res.status(400).json({ error: "Amount and userid is reqd." });
    }

    try {
        const options = {
            amount: amount, // Amount in paise
            currency: "INR",
            receipt: "receipt_" + new Date().getTime(),
            payment_capture: 1

        };
        const response = await razorpay.orders.create(options);
        console.log(response)
        const client = await connectToDatabase();
        const database = client.db("printvistas"); // Replace with your database name
        const collection = database.collection("orders"); // Replace with your collection name
        const newOrder = { amount, userId };
        const result = await collection.insertOne(newOrder);



        res.status(200).json({
            userId: result.insertedId,
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async(req, res) => {
    const { orderId, paymentId, signature } = req.body;

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (generatedSignature === signature) {
        res.status(200).json({ message: "Payment verified successfully!" });
    } else {
        res.status(400).json({ message: "Payment verification failed!" });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};