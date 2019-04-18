var firebase = require("firebase-admin");

// initial connection to firebase database
function initializeFirebase() {
    var serviceAccount = require("./online-shopping-microservices-firebase-adminsdk.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://online-shopping-microservices.firebaseio.com"
    });
};

//
const dateAndTimeOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
const timeOptions = {
    hour: "2-digit",
    minute: "2-digit"
};

// each action the user does is sores in the system, this function return an array of logs of all users
async function getLogs() {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('logs');
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const logs = data.val();
              for (var key in logs) {

            result.push(logs[key]);

        }
    });
    return result;
}
// each action the user does is sores in the system, this function save log for specific user. It stors which user which item is reviewed or viewed or
// or searched or bought
async function saveLog(userId, itemId, action) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('logs');
    var log = {
        action: action,
        itemId: itemId,
        userId: userId,
        date: new Date().toLocaleTimeString("en-us", dateAndTimeOptions)

    };
    dataBaseRef.push(log);

    return true;
}

// it returns an array of all items in the online store
async function getItems() {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('items');
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const items = data.val();

        for (var key in items) {

            result.push(items[key]);

        }

    });
    return result;
}


// sometimes an item is added to store or removed from store, this function add or update the item as input argument
async function addOrUpdateItemToItemsInStore(item) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var resultFlag = false;
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('items');
    var item = {
        category: item.category,
        itemId: item.itemId,
        description: item.description,
        itemName: item.itemName,
        price: item.price,
        rate: item.rate,
        seller: item.seller,
        status: item.status
    };
    await dataBaseRef.once("value", function (data) {
        const items = data.val();

        for (var key in items) {

            if (items[key].itemId === item.itemId) {
                dataBaseRef.child(key).remove();
                resultFlag=true;
                break;

            }

        }
        dataBaseRef.push(item);

    });
    return   resultFlag;
}
//
// sometimes an item is removed from an store, this function delete the item as input argument
async function deleteItemFromItemsInStore(item) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var resultFlag = false;
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('items');
    var item = {
        category: item.category,
        itemId: item.itemId,
        description: item.description,
        itemName: item.itemName,
        price: item.price,
        rate: item.rate,
        seller: item.seller,
        status: item.status
    };
    await dataBaseRef.once("value", function (data) {
        const items = data.val();

        for (var key in items) {

            if (items[key].itemId === item.itemId) {
                dataBaseRef.child(key).remove();
                resultFlag=true;
                break;

            }

        }

    });
    return   resultFlag;
}

// each user has only one shopping cart, this function return an array of logs of all users's shopping carts
async function getShoppingCarts() {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('shoppingCarts');
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const carts = data.val();

        for (var key in carts) {

            result.push(carts[key]);

        }
    });
    return result;
}


// each user has only one shopping cart, this function add or update an item to the user's shopping cart
async function updateShoppingCart(userId, item) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var resultFlag = false;
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('shoppingCarts');

    await dataBaseRef.once("value", function (data) {
        const carts = data.val();

        for (var key in carts) {

            if (carts[key].userId === userId) {
                for (var itemKey in carts[key].items) {
                    if (carts[key].items[itemKey].itemId === item.itemId) {

                        dataBaseRef.child(key).child("items").child(itemKey).remove();
                        resultFlag=true;
                        break;
                    }
                }
                var itemTmp = {
                    category: item.category,
                    itemId: item.itemId,
                    description: item.description,
                    itemName: item.itemName,
                    price: item.price,
                    rate: item.rate,
                    seller: item.seller,
                    status: item.status
                };
                dataBaseRef.child(key).child("items").push(itemTmp);
            }

        }


    });
    return resultFlag;
}
// in online stores users can write review for items in the store, this function handle this logic.
async function addOrUpdateReview(userId, itemId , comment, rate) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var resultFlag = false;
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('reviews');
    var review = {
        userId: userId,
        comment: comment,
        rate: rate,
    };
    await dataBaseRef.once("value", function (data) {
        const allReviews = data.val();

             for (var key in allReviews) {
            if (allReviews[key].itemId === itemId && allReviews[key].review.userId ===userId ) {
                dataBaseRef.child(key).child("review").set({
                    comment:comment,
                    rate: rate,
                    userId: userId
                });
                resultFlag=true;

            }
        }

        if(!resultFlag){
            dataBaseRef.push({
                itemId: itemId,
                review: {
                    userId: userId,
                    comment: comment,
                    rate: rate
                }
            });
        }


    });
    return resultFlag;
}
// it returns an array of all users of the system. user info of each element in this array contain user Id, first name, last name, address
async function getUsers() {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('users');
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const items = data.val();

        for (var key in items) {

            result.push(items[key]);

        }

    });
    return result;
}

module.exports = {
    getLogs: getLogs,
    saveLog: saveLog,
    getItems: getItems,
    deleteItemFromItemInStore: deleteItemFromItemsInStore,
    addOrUpdateItemToItemsInStore: addOrUpdateItemToItemsInStore,
    getShoppingCarts: getShoppingCarts,
    updateShoppingCart: updateShoppingCart,
    addOrUpdateReview :addOrUpdateReview,
    getUsers:getUsers

};
