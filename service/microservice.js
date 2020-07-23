
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

async function logUserAction(userId, action) {
    if(!userId)
        throw new TypeError('Illegal argument exception. UserId undefined')
    const logObject  = {
        action,
        userId,
        objectId: Math.floor(Math.random() * Math.floor(10000000000)),
        objectType: "logs"
    }
    const resp = await firebaseWrapper.createObject("logs", logObject)
    console.log("saved in fdb", resp)
}

async function searchItemsByCriterias(criteria) {
    if (!criteria)
        throw new TypeError('Illegal argument exception. Criteria undefined')
    let result = []
    var itemList  = await firebaseWrapper.getObjects("items")
    itemList.forEach((item, index) => {
        Object.keys(item).forEach(key => {
            if(item[key] === criteria)
                result.push(item)
        })
    })
    return result
}

async function searchItemsByName(searchName) {
    if (!searchName)
        throw new TypeError('Illegal argument exception. searchName undefined')
    let result = []
    var itemList = await firebaseWrapper.getObjects("items")
    itemList.forEach((item, index) => {
        console.log("itemName", item)
            if (item.itemName.toLowerCase() === searchName.toLowerCase())
                result.push(item)
    })
    return result
}

async function fetchShoppingCart(userId) {
    if (!userId) throw new TypeError('Illegal argument exception. userId not defined')

    const cartList = await firebaseWrapper.getObjects("cart")
    const userCarts = cartList.filter(cart => cart.userId=== userId)
    if (userCarts.length  > 1) throw new TypeError("User has more than 1 cart")
    if (userCarts.length <= 0) throw new TypeError("User has no cart.")
    return userCarts
}

async function fetchSimilarItems(itemName) {
    if (!userId) throw new TypeError('Illegal argument exception. userId not defined')
    let result = []
    const itemList = await firebaseWrapper.getObjects("items")
    itemList.forEach((item, index) => {
        if(item.itemName.toLowerCase().includes(itemName.toLowerCase()))
        result.push(item)
    })
    if(result.length >= 30)
        result = result.filter(item => item.rating >= 3.5)
    
    return result

}

module.exports = {
    yourRecommendations,
    searchItemsByCriterias,
    searchItemsByName,
    fetchShoppingCart,
    fetchSimilarItems,
    logUserAction
};
