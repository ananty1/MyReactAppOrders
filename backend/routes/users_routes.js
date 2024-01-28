import express from "express";
import { checkUser, createUser } from "../database/user_controllers.js";
import { showItems } from "../database/items_controllers.js";
import { addLiveOrder } from "../database/live_order_controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("This is user routes");
  return res.send("This is user routes");
});

router.post("/login", async (req, res) => {
  const result = await checkUser(req.body.Email, req.body.Password);
  return res.send(result);
});

router.post("/signup", async (req, res) => {
  const userData = {
    Name: req.body.Name,
    UserName: req.body.UserName,
    Password: req.body.Password,
    PhoneNo: req.body.PhoneNo,
    Email: req.body.Email,
    UserType: req.body.UserType,
    AddressLine1: req.body.AddressLine1,
    AddressLine2: req.body.AddressLine2,
    City: req.body.City,
    State: req.body.State,
    PostalCode: req.body.PostalCode,
    Country: req.body.Country,
  };
  const result = await createUser(userData);
  return res.send(result);
});

router.get("/items", async (req, res) => {
  const result = await showItems();
  return res.send(result);
});

router.post("/add-live-orders", async (req, res) => {
  console.log("This is cart req body", typeof req.body);
  const liveOrderData = req.body;
  // console.log(liveOrderData.length);
  if (liveOrderData.length == 0) {
    return res.send("Order data is empty");
  }

  for (let i = 0; i < liveOrderData.length; i++) {
    const result = await addLiveOrder(liveOrderData[i]);
  }
  return res.send("add-live-order INVOKED");
  // const liveOrderData = {
  //   ItemID: req.body.ItemID,
  //   UserID: req.body.UserID,
  //   ShopkeeperID: req.body.ShopkeeperID,
  //   OrderStatus: req.body.OrderStatus,
  //   TotalQuantity: req.body.TotalQuantity,
  //   TotalAmount: req.body.TotalAmount,
  // };
  // const result = await addLiveOrder(liveOrderData);
});

export default router;
