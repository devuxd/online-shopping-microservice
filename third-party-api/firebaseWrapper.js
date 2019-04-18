var firebase = require("firebase-admin");

// initial connection to firebase database
function initializeFirebase() {
    var serviceAccount = require("./online-shopping-microservices-firebase-adminsdk.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://online-shopping-microservices.firebaseio.com"
    });
};

// object{path:path,id:id}

async function createObject(object) {

    if (!firebase.apps.length) {
        initializeFirebase();
    }
    await firebase.database().ref().child(object.objectType).push(object);
}

async function getObjects(objectType) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = await firebase.database().ref().child(objectType);
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const items = data.val();
        for (var key in items) {
            result.push(items[key]);
        }
    });
    return result;
}

async function deleteObject(objectType, objectId) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = await firebase.database().ref().child(objectType);
    await dataBaseRef.once("value", function (data) {
        const items = data.val();
        for (var key in items) {
            if (items[key].objectId === objectId) {
                dataBaseRef.child(key).remove();
                return true;
            }
        }
    });
    return false;
}
async function deleteObject(objectType, objectId) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = await firebase.database().ref().child(objectType);
    await dataBaseRef.once("value", function (data) {
        const items = data.val();
        for (var key in items) {
            if (items[key].objectId === objectId) {
                dataBaseRef.child(key).remove();
                return true;
            }
        }
    });
    return false;
}

async function updateObject(object) {
   var deletedFlag =deleteObject(object.objectType, object.objectId)
    if(deletedFlag){
        createObject(object);
    }
}



module.exports = {
    createObject: createObject,
    deleteObject: deleteObject,
    updateObject: updateObject,
    getObjects: getObjects,


};
