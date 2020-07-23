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

// Function to search for an item in an online store.
async function searchForItems(userId, criteria) {

    //  If any of the input arguments are empty or null
    if (!criteria || criteria == '') {
        throw new TypeError('No criteria provided!');
    }

    //get the items from the DB
    var itemsList = await firebaseWrapper.getObjects("items");
    if (itemsList) {
        // search for a criteria march in names, description, and other categories in order
        var result = searchItems(itemsList, criteria.trim());

        if (userId && result) {
            //  the handler should store a log object from the items that the user searched for future recommendations.
            logItems(userId, result, "searched");

        }
        //return the list of items that match with the criteria
        return result
    } else {
        //no items in the DB!
        throw new TypeError('No items found in the DB')
    }
}//end funtion

//TODO: check if other categories means other keys in the item objects or the category key of the objects
// This could be problematic sinc I have to find the list of all keys
async function searchItems(itemsList, criteria) {
    //  at the first the handler searches among all names of all items
    var match = filterListByValueOfKey(itemsList, criteria, "itemName");

    if (match == null) {
        //  if it could not find a match then go through matching among a description of items,
        match = filterListByValueOfKey(itemsList, criteria, "description");
    }

    if (match == null) {
        //  if it could not find a match in description go through search among categories of all items in the store.
        match = filterListByValueOfKey(itemsList, criteria, "category");
    }

    // null if no items found
    return match;
}//end function


async function searchItem(userId, itemName) {

    //  If any of the input arguments are empty or null
    if (!itemName || criteria == '') {
        throw new TypeError('No item name provided!');
    }

    //get the items from the DB
    var itemsList = await firebaseWrapper.getObjects("items");
    var match= null;
    if (itemsList) {
        //  search for item by the given name
        match= filterListByValueOfKey(itemsList, itemName, "itemName");

        if (userId && match) {
            //  the handler should store a log object from the items that the user searched for future recommendations.
            logItems(userId, match, "browsed");
        }
    } else {
        //no items in the DB!
        throw new TypeError('No items found in the DB')
    }
    // null if no items found
    return match;
}//end function

async function filterListByValueOfKey(list, criteria, key) {
    var match = list.filter(function (item) {
        return item[key] == criteria;
    });
    return match;
}//end function

async function logItems(userId, result, action) {
    try {
        //loop over found items
        result.forEach(function (foundItem) {
            // add the items to uder log
            var logAdded = await firebaseWrapper.createObject("logs", {
                action: action,
                itemId: foundItem.itemId,
                userId: userId,
                date: new Date().toLocaleTimeString("en-us", dateAndTimeOptions)
            });
        });
        return true;
    } catch (e) {
        console.log('exception: ', "Something went wrong when trying to log the uuser search result.");
        return false;
    }
}//end function


// function to return the  purchase history.
async function getPurchasesHistory(userId) {
    if (!userId) {
        throw new TypeError('Illegal Argument Exception');
    }
    //searches the users' logs
    var logs = await firebaseWrapper.getObjects("logs");
    // filter by the user id
    var userLogs = filterListByValueOfKey(logs, 'userId', userId);
    // filter by the log type
    var userPurchaseLogs = filterListByValueOfKey(userLogs, 'bought', "action");

    // returns items that the user purchased
    return userPurchaseLogs;
}//end function

// function to return the  recently viewed items
async function getRecentlyViewedItems(userId) {
    if (!userId) {
        throw new TypeError('Illegal Argument Exception');
    // }
    //searches the users' logs
    var logs = await firebaseWrapper.getObjects("logs");
    // filter by the user id
    var userLogs = filterListByValueOfKey(logs, 'userId', userId);
    // filter by the log type
    var userViewLogs = filterListByValueOfKey(userLogs, 'viewed', "action");

    // returns items that the user purchased
    return userViewLogs;
}//end function

module.exports = {
    yourRecommendations: yourRecommendations
    searchItems: searchForItems
    browseItems: searchItem
    purchasesHistories: getPurchasesHistory
    recentlyViewedItems: getRecentlyViewedItems
};
