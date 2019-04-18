
var firebaseWrapper = require('../third-party-api/firebaseWrapper');
var testEnvironment = true;

// it returns an array of items that user with userId as input arguments viewed before. It gets
//logs of the user and each item has action of viewed wil be returned.
async function yourRecommendations(userId) {
    if (!userId) {
        throw new TypeError('Illegal Argument Exception');
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
        if (logsList[i].action === 'viewed' && logsList[i].userId === userId) {
            result.push(logsList[i]);
        }
    }
    console.dir(result);
    return result;

}


module.exports = {
    yourRecommendations: yourRecommendations
};
