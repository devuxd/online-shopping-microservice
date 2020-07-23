var express = require("express");
var router = express.Router();
var service = require("../service/microservice");
var testEnvironment = true;

router.get("/", function(req, res, next) {
  res.send("List of endpoints: yourRecommendations ");
});

router.get("/reviewAnItem", async function(req, res, next) {
  var userId = req.query.userId;
  var itemId = req.query.itemId;
  var comment = req.query.comment;
  var rating = req.query.rating;

  if (!userId || !itemId || !comment || !rating) {
    res.status(400).send("Invalid request data");
  }
  const users = await service.getUsers(userId);

  if (users.length > 0) {
    var review = {
      objectType: "reviews", //{logs,reviews,users,items,shoppingCarts}
      objectId: "123", // Math.floor(Math.random() * Math.floor(10000000000))
      itemId: itemId,
      comment: comment,
      rate: rating,
      userId: userId,
    };
    const status = await service.addReview(review);
    if (status) {
      res.status(200).send("Review added!");
    } else {
      res.status(400).send("Could an review");
    }
  } else {
    res.status(400).send("Invalid userId");
  }
});

// router.get("/addAnItem", async (req, res, next) => {
//   try {
//     res.json(itemList);
//   } catch (e) {
//     this will eventually be handled by your error handling middleware
//     if (e instanceof TypeError || e.message == "Illegal Argument Exception") {
//       const nullObjects = [
//         {
//           name: "null",
//           description: "null",
//           id: "null",
//           status: "null",
//           groupId: "null",
//           price: "null",
//           seller: "null",
//           rate: "null",
//           reviews: {},
//         },
//       ];
//       res.send(nullObjects);
//     } else {
//       console.log("exception: ", e.message);
//       next(e);
//     }
//   }
// });

module.exports = router;
