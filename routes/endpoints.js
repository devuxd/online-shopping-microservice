var express = require("express");
var router = express.Router();
var service = require("../service/microservice");
var testEnvironment = true;

router.get("/", function(req, res, next) {
  res.send("List of endpoints: yourRecommendations ");
});

router.get("/yourRecommendations", async (req, res, next) => {
  try {
    const itemList = await service.yourRecommendations(req.query.userId);
    res.json(itemList);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    if (e instanceof TypeError || e.message == "Illegal Argument Exception") {
      const nullObjects = [
        {
          name: "null",
          description: "null",
          id: "null",
          status: "null",
          groupId: "null",
          price: "null",
          seller: "null",
          rate: "null",
          reviews: {},
        },
      ];
      res.send(nullObjects);
    } else {
      console.log("exception: ", e.message);
      next(e);
    }
  }
});

router.get("/fetchShoppingCart", async (req, res, next) => {
  try {
    const users = await service.getUsers(req.query.userId);

    if (users.length > 0) {
      const itemList = await service.yourShoppingCart(req.query.userId);

      if (itemList.length === 0) {
        res
          .status(200)
          .send("No carts found for the User Id: " + req.query.userId);
      } else {
        res.json({
          CartsFound: itemList.length,
          CartsData: itemList,
        });
      }
    } else {
      res.status(400).send("Invalid User Id");
    }
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    if (e instanceof TypeError || e.message == "Illegal Argument Exception") {
      const nullObjects = [
        {
          name: "null",
          description: "null",
          id: "null",
          status: "null",
          groupId: "null",
          price: "null",
          seller: "null",
          rate: "null",
          reviews: {},
        },
      ];
      res.send(nullObjects);
    } else {
      console.log("exception: ", e.message);
      next(e);
    }
  }
});

router.get("/recentlyViewedItems", async (req, res, next) => {
  try {
    const users = await service.getUsers(req.query.userId);

    if (users.length > 0) {
      const itemList = await service.yourRecentlyViewedItems(req.query.userId);

      if (itemList.length === 0) {
        res
          .status(200)
          .send("No items viewed by the User Id: " + req.query.userId);
      } else {
        res.json({
          Logs: itemList,
        });
      }
    } else {
      res.status(400).send("Invalid User Id");
    }
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    if (e instanceof TypeError || e.message == "Illegal Argument Exception") {
      const nullObjects = [
        {
          name: "null",
          description: "null",
          id: "null",
          status: "null",
          groupId: "null",
          price: "null",
          seller: "null",
          rate: "null",
          reviews: {},
        },
      ];
      res.send(nullObjects);
    } else {
      console.log("exception: ", e.message);
      next(e);
    }
  }
});
module.exports = router;
