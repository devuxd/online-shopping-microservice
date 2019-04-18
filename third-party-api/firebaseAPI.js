var firebase = require("firebase-admin");


function initializeFirebase() {
    var serviceAccount = require("./online-shopping-microservices-firebase-adminsdk.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://online-shopping-microservices.firebaseio.com"
    });
};

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

async function getLogs() {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('logs');
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const logs = data.val();

        // for (var i=0; i <logs.length;i++){
        //     result.push(logs[i]);
        // }
        for (var key in logs) {

            result.push(logs[key]);

        }
    });
    return result;
}

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

        // for (var key in allReviews) {
        //
        //     if (allReviews[key].itemId === itemId) {
        //         for (var itemKey in allReviews[key].reviewsOfItem) {
        //             if (allReviews[key].reviewsOfItem[itemKey].userId === userId) {
        //
        //                 dataBaseRef.child(key).child("reviewsOfItem").child(itemKey).remove();
        //                 resultFlag=true;
        //                 break;
        //             }
        //         }
        //
        //         dataBaseRef.child(key).child("reviewsOfItem").push(review);
        //     }
        //
        // }
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

module.exports = {
    getLogs: getLogs,
    saveLog: saveLog,
    getItems: getItems,
    deleteItemFromItemInStore: deleteItemFromItemsInStore,
    addOrUpdateItemToItemsInStore: addOrUpdateItemToItemsInStore,
    getShoppingCarts: getShoppingCarts,
    updateShoppingCart: updateShoppingCart,
    addOrUpdateReview :addOrUpdateReview

};
