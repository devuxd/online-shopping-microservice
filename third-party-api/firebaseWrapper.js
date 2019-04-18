var firebase = require("firebase-admin");

// initial connection to firebase database
function initializeFirebase() {
    var serviceAccount = require("./online-shopping-microservices-firebase-adminsdk.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://online-shopping-microservices.firebaseio.com"
    });
};

//for calling all function of this class you must use await keyword before calling ex: await createObject(object)
//this function store an object in database, the objects have to have 2 mandatory fields 1) object.objectId 2) object.objectType
async function createObject(object) {
    if(!object.objectType || ! object.objectId)
        return false;
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    await firebase.database().ref().child(object.objectType).push(object);
    return true;
}
//for calling all function of this class you must use await keyword before calling ex: await createObject(object)
//this function returns an array of objects in database, the objectType should not be null or empty
async function getObjects(objectType) {
    if(!objectType)
        return [];
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
//for calling all function of this class you must use await keyword before calling ex: await createObject(object)
//this function store an object in database, the function have to have 2 mandatory and valid arguments 1) objectId 2) objectType
async function deleteObject(objectType, objectId) {
    if(!objectType || !objectId)
        return false;
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


//for calling all function of this class you must use await keyword before calling ex: await createObject(object)
//this function store an object in database, the objects have to have 2 mandatory fields 1) object.objectId 2) object.objectType
async function updateObject(object) {
   var deletedFlag =deleteObject(object.objectType, object.objectId);
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
