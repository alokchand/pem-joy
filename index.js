import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import pemRoutes from "./routes/pem.js";
import customerRoutes from "./routes/customer.js";
import shopRoutes from "./routes/shop.js";

// Morgan
import morgan from "morgan";

// swagger
import swaggerUI from "swagger-ui-express";
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

app.use(morgan("dev"));

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
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------- SCHEMA FOR PEM --------------------
/**
 * @swagger
 * definitions:
 *  pem:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the pem
 *     example: 'sandhya'
 *    email:
 *     type: string
 *     description: email of the pem
 *     example: 'sr@gmail.com'
 *    username:
 *     type: string
 *     description: username of the pem
 *     example: 'SRIAA'
 *    password:
 *     type: string
 *     description: password of the pem
 *     example: '12345'
 *    latitude:
 *     type: string
 *     description: latitude of the pem
 *     example: '18'
 *    longitude:
 *     type: string
 *     description: longitude of pem
 *     example: '30'
 *    distance:
 *     type: string
 *     description: distance
 *     example: '30'
 *    city:
 *     type: string
 *     description: city of the pem
 *     example: 'Telangana'
 *    address:
 *     type: string
 *     description: address of the pem
 *     example: 'Telangana,Nalgonda'
 *    occuption:
 *      type: string
 *      description: occupation
 *      example: 'Plumber'
*/


// -------------------- SCHEMA FOR CUSTOMER ------------------------
/**
 * @swagger
 * definitions:
 *  customer:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: username of the pem
 *     example: 'SRIAA'
 *    password:
 *     type: string
 *     description: password of the pem
 *     example: '12345'
 *    latitude:
 *     type: string
 *     description: latitude of the pem
 *     example: '18'
 *    longitude:
 *     type: string
 *     description: longitude of pem
 *     example: '30'
*/

// ------------------ SCHEMA FOR SHOP----------------
/**
 * @swagger
 * definitions:
 *  shop:
 *   type: object
 *   properties:
 *    ownername:
 *     type: string
 *     description: ownername of the shop
 *     example: 'sandhya'
 *    email:
 *     type: string
 *     description: email of the pem
 *     example: 'sr@gmail.com'
 *    username:
 *     type: string
 *     description: username of the pem
 *     example: 'SRIAA'
*    password:
 *     type: string
 *     description: password of the pem
 *     example: '12345'
 *    latitude:
 *     type: string
 *     description: latitude of the pem
 *     example: '18'
 *    longitude:
 *     type: string
 *     description: longitude of pem
 *     example: '30'
 *    distance:
 *     type: string
 *     description: distance
 *     example: '30'
 *    city:
 *     type: string
 *     description: city of the pem
 *     example: 'Telangana'
 *    address:
 *     type: string
 *     description: address of the pem
 *     example: 'Telangana,Nalgonda'
 *    shopName:
 *      type: string
 *      description: shopName
 *      example: 'Plumber'
 *    description:
 *      type: string
 *      description: description about shop
 *      example: 'Plumber shop'
 *    shopType:
 *      type: string
 *      description: shopType
 *      example: 'Plumber'
 *    image1:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item1:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices1:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image2:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item2:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices2:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image3:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item3:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices3:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image4:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item4:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices4:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image5:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item5:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices5:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image6:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item6:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices6:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image7:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item7:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices7:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image8:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item8:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices8:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image9:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item9:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices9:
 *      type: string
 *      description: price
 *      example: 'price1'
 *    image10:
 *      type: string
 *      description: image
 *      example: 'img'
 *    item10:
 *      type: string
 *      description: item
 *      example: 'item1'
 *    prices10:
 *      type: string
 *      description: price
 *      example: 'price1'
 
*/
// ------------------GET SWAGGER FOR PEM------------------
/**
 * @swagger
 * /pem:
 *  get:
 *    description: visiting
 *    responses:
 *      200:
 *        description: A successful response
 */

//-----------------POST SWAGGER FOR PEM---------------------

/**
 * @swagger
 * /pem:
 *  post:
 *   summary: create pem
 *   description: create pem
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the pem
 *      schema:
 *       $ref: '#/definitions/pem'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/pem'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */

// ----------------------PATCH SWAGGER FOR PEM --------------------
/**
 * @swagger
 * /pem/{id}:
 *  patch:
 *   summary: update pem
 *   description: update pem
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the pem
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/pem'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/pem'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/pem' 
 */

// -------------------- DELETE SWAGGER FOR PEM ----------------------------
/**
 * @swagger
 * /pem/{id}:
 *  delete:
 *   summary: delete pem
 *   description: delete pem
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the pem
 *      example: 6248fbcc5f91010e927099d0
 *   responses:
 *    200:
 *     description: success
 */
app.use("/pem", pemRoutes);

// ----------------- GET SWAGGER FOR CUSTOMER ---------------------

/**
 * @swagger
 * /customer:
 *  get:
 *    description: visiting route
 *    responses:
 *      200:
 *        description: A successful response
 */

// ------------------ POST SWAGGER FOR CUSTOMER -------------------
/**
 * @swagger
 * /customer:
 *  post:
 *   summary: create Customer
 *   description: create Customer
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the customer
 *      schema:
 *       $ref: '#/definitions/customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/customer'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
// ----------------------PATCH SWAGGER FOR CUSTOMER --------------------
/**
 * @swagger
 * /customer/{id}:
 *  patch:
 *   summary: update customer
 *   description: update customer
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the customer
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/customer'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/customer'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/customer' 
 */
// -------------------- DELETE SWAGGER FOR CUSTOMER ----------------------------
/**
 * @swagger
 * /customer/{id}:
 *  delete:
 *   summary: delete customer
 *   description: delete customer
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the customer
 *      example: 6248fbcc5f91010e927099d0
 *   responses:
 *    200:
 *     description: success
 */
app.use("/customer", customerRoutes);
// -------------- GET SWAGGER FOR SHOP -----------------
/**
 * @swagger
 * /shop:
 *  get:
 *    description: visiting route
 *    responses:
 *      200:
 *        description: A successful response
 */

// ---------------- POST SWAGGER FOR SHOP---------------------
/**
 * @swagger
 * /shop:
 *  post:
 *   summary: create shop
 *   description: create shop
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the pem
 *      schema:
 *       $ref: '#/definitions/shop'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/shop'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
// ----------------------PATCH SWAGGER FOR PEM --------------------
/**
 * @swagger
 * /shop/{id}:
 *  patch:
 *   summary: update shop
 *   description: update shop
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the shop
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/shop'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/shop'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/shop' 
 */
// -------------------- DELETE SWAGGER FOR SHOP ----------------------------
/**
 * @swagger
 * /shop/{id}:
 *  delete:
 *   summary: delete shop
 *   description: delete shop
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the shop
 *      example: 6248fbcc5f91010e927099d0
 *   responses:
 *    200:
 *     description: success
 */
app.use("/shop", shopRoutes);

// -------------------------------PAYMENT ROUT----------------------------------
// -------------------- SCHEMA FOR PAYMENT ------------------------
/**
 * @swagger
 * definitions:
 *  payment:
 *   type: object
 *   properties:
 *    amount:
 *     type: string
 *     description: payment amount
 *     example: '3000rupees'
 *    currency:
 *     type: string
 *     description: type of currency
 *     example: 'rupees'
 *    description:
 *     type: string
 *     description: pem
 *     example: 'pem'
 *    payment_method:
 *     type: string
 *     description: id of the person
 *     example: '6234578999232740c'
*/

// ------------------------ PAYMENT SWAGGER ----------------------------------------
/**
 * @swagger
 * /payment:
 *  post:
 *   summary: Do payment
 *   description: Do payment
 *   parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      description: body of the pem
 *      schema:
 *       $ref: '#/definitions/payment'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/payment'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
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
// -------------- GET SWAGGER FOR SMS -----------------
/**
 * @swagger
 * /send-text:
 *  get:
 *    description: visiting route
 *    responses:
 *      200:
 *        description: A successful response
 */

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
