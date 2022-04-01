import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import pemRoutes from "./routes/pem.js";
import customerRoutes from "./routes/customer.js";
import shopRoutes from "./routes/shop.js";

// swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// SMS Imports
import twilio from "twilio";
const accountSid = "AC38960bebc221b5d797c102e262e845b8";
const authToken = "47e4353ea948d8b80111c792893901df";
const client = new twilio(accountSid, authToken);

// Payment Imports
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

// creating app
const app = express();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());

//---------------------------------Swagger Route-----------------------------------------

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Welcome API",
      description: "Welcomes all the users to pem-joy application",
      contact: {
        name: "WBD group 18",
      },
    },
    servers: ["http://localhost:5000"],
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *  get:
 *    description: visiting route
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/", (req, res) => {
  res.send("Hello and welcome to pemjoy");
});

app.use("/pem", pemRoutes);
app.use("/customer", customerRoutes);
app.use("/shop", shopRoutes);

// -------------------------------PAYMENT ROUT----------------------------------

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "PEM",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});
// -------------------------------SMS ROUT----------------------------------

app.get("/send-text", (req, res) => {
  // //Welcome Message
  // res.send('Hello to the Twilio Server')

  // //_GET Variables
  const { recipient, lat, lon, customer } = req.query;

  //Send Text
  client.messages
    .create({
      body: `name of customer ${customer}. location:  https://gps-coordinates.org/my-location.php?lat=${lat}&lng=${lon}`,
      to: "+917013637725", // Text this number
      from: "+19285648843", // From a valid Twilio number
    })
    .then((message) => console.log(message.body))
    .catch((error) => console.log(error.message));
});

const CONNECTION_URL =
  "mongodb+srv://rohit11544:rohit123@cluster0.qmciq.mongodb.net/fsd?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

// connecting mongoDB to server
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
