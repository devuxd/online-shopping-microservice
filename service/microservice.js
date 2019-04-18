
var firebaseUtil = require('../third-party-api/firebaseAPI');
var firebaseWrapper = require('../third-party-api/firebaseWrapper');
var testEnvironment = true;

// it returns an array of items that user with userId as input arguments viewed before. It gets
//logs of the user and each item has action of viewed wil be returned.
async function yourRecommendations(userId) {
    if (!userId) {
        throw new TypeError('Illegal Argument Exception');
    }
    var item ={
        objectType:"items",
        // objectId: Math.floor(Math.random() * Math.floor(10000000000)),
        objectId: 1233030367,
        category:"Electric" ,
        itemId: 1233030367,
        description: "smart Tv",
        itemName: "samsungTV",
        price: 1233030367,
        rate: 5,
        seller: "bestbuy",
        status: "available"
    };
  // await firebaseWrapper.createObject(item);
   await firebaseWrapper.updateObject(item);
  //   var result = await firebaseWrapper.getObjects(item.objectType);
  //   var result = await firebaseWrapper.deleteObject(item.objectType,9334944901);
  //   console.dir(result);
  //var logs = await firebaseUtil.getLogs();
  // var carts = await firebaseUtil.getShoppingCarts();
  // var items = await firebaseUtil.getItems();
  // var flag = await firebaseUtil.addOrUpdateItemToItemsInStore(item);
  // var flag = await firebaseUtil.deleteItemFromItemInStore(item);
  // var flag2 = await firebaseUtil.updateShoppingCart("eaghayi",item);
  // //  await firebaseUtil.saveLog('eaghayi','1','viewed');
  // var flagReview = await firebaseUtil.addOrUpdateReview("tlatoza",11,"not bad6",4);
  // var users = await firebaseUtil.getUsers();
  //   const result=[];
  //   for(var i=0;i< logs.length ; i++){
  //       if(logs[i].action==='viewed' && logs[i].userId === userId ){
  //           result.push(logs[i]);
  //       }
  //   }
  //   return result;
}



module.exports = {
    yourRecommendations: yourRecommendations
};

