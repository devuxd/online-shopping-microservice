
var firebaseUtil = require('../third-party-api/firebaseAPI');
var testEnvironment = true;


async function yourRecommendations(userId) {
    if (!userId) {
        throw new TypeError('Illegal Argument Exception');
    }
    var item ={
        category:"elx" ,
        itemId: 1,
        description: "smart Tv",
        itemName: "samsungTV",
        price: 800,
        rate: 3,
        seller: "bestbuy",
        status: "available"
    };
  var logs = await firebaseUtil.getLogs();
  // var carts = await firebaseUtil.getShoppingCarts();
  // var items = await firebaseUtil.getItems();
  // //var flag = await firebaseUtil.saveOrUpdateItem(item);
  // var flag2 = await firebaseUtil.updateShoppingCart("eaghayi",item);
  // console.log('25: '+flag2);
  // //  await firebaseUtil.saveLog('eaghayi','1','viewed');
  //
  //
  //   console.log("logs"+logs);
    const result=[];
    for(var i=0;i< logs.length ; i++){
        if(logs[i].action==='viewed' && logs[i].userId === userId ){
            result.push(logs[i]);
        }
    }
    return result;
}



module.exports = {
    yourRecommendations: yourRecommendations
};

