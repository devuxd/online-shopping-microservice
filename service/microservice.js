var firebaseWrapper = require("../third-party-api/firebaseWrapper");
var testEnvironment = true;

// it returns an array of items that user with userId as input arguments viewed before. It gets
//logs of the user and each item has action of viewed wil be returned.
async function yourRecommendations(userId) {
  if (!userId) {
    throw new TypeError("Illegal Argument Exception");
  }
  // var logADT ={
  //     objectType: "logs" , //{logs,reviews,users,items,shoppingCarts}
  //     objectId :  Math.floor(Math.random() * Math.floor(10000000000)),  // random integer less than 1000000000
  //     itemId:2,
  //     action:"viewed",
  //     Date:new Date(),
  //     userId:"eaghayi",
  // }
  // await firebaseWrapper.createObject(logADT);
  const result = [];
  var logsList = await firebaseWrapper.getObjects("logs");
  for (var i = 0; i < logsList.length; i++) {
    if (logsList[i].action === "viewed" && logsList[i].userId === userId) {
      result.push(logsList[i]);
    }
  }
  console.dir(result);
  return result;
}

async function addReview(review) {
  try {
    var result = await firebaseWrapper.createObject(review.objectType, review);
  } catch (e) {
    throw e;
  }
  return result;
}

async function getUsers(userId) {
  if (!userId) {
    throw new TypeError("Illegal Argument Exception");
  }

  const results = [];
  var users = await firebaseWrapper.getObjects("users");

  for (var i = 0; i < users.length; i++) {
    if (users[i].name === userId) {
      results.push(results[i]);
    }
  }
  return results;
}

async function yourShoppingCart(userId) {
  if (!userId) {
    throw new TypeError("Illegal Argument Exception");
  }

  const result = [];
  var cartList = await firebaseWrapper.getObjects("cart");
  for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].userId === userId) {
      result.push(cartList[i]);
    }
  }
  return result;
}
async function yourRecentlyViewedItems(userId) {
  if (!userId) {
    throw new TypeError("Illegal Argument Exception");
  }

  const result = [];
  var logsList = await firebaseWrapper.getObjects("logs");
  for (var i = 0; i < logsList.length; i++) {
    if (logsList[i].action === "viewed" && logsList[i].userId === userId) {
      result.push(logsList[i]);
    }
  }
  return result;
}
module.exports = {
  yourRecommendations: yourRecommendations,
  getUsers: getUsers,
  addReview: addReview,
  yourShoppingCart: yourShoppingCart,
  yourRecentlyViewedItems: yourRecentlyViewedItems,
};
