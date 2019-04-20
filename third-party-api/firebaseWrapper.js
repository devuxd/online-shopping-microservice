var firebase = require("firebase-admin");

// initial connection to firebase database
function initializeFirebase() {
    var serviceAccount = require("./online-shopping-microservices-firebase-adminsdk.json");
    firebase.initializeApp({credential: firebase.credential.cert(serviceAccount), databaseURL: "https://online-shopping-microservices.firebaseio.com"});
};

//for calling all function of this class you must use await keyword before calling ex: await createObject(path, object)
//this function store an object in firebase database. This function has two arguments the first one (path) specify the object in which path in the firebase will be saved, for example:
// createObject("users",obj) saves the object under the path of users. The second argument is an object that can have any fields, but "objectId" is mandatory field for the second input argument,
//so each object as an input argument must have a field with the name of "objectId", ex: UserObj = {objectId:12519, userId:'egha232',firstName:'alex', lastName:'mousavi'}. The function return
// a boolean, if the function can save the object in the path it returns true, otherwise it returns false.


async function createObject(path,obj) {
    if(!path || ! obj.objectId)
        return false;
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    await firebase.database().ref().child(path).push(obj);
    return true;
}



//for calling all function of this class you must use await keyword before calling ex: await getObjects(path)
//this function returns an array of object in firebase database. This function only one argument. The argument (path) specify the object in which path in the firebase is saved,
// for example: getObjects("items") returns all objects under the path of "items" in the firebase. If it couldnot find any object in the path it returns empty array.
async function getObjects(path) {
    if(!path)
        return [];
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = await firebase.database().ref().child(path);
    var result = [];
    await dataBaseRef.once("value", function (data) {
        const items = data.val();
        for (var key in items) {
            result.push(items[key]);
        }
    });
    return result;
}


//for calling all function of this class you must use await keyword before calling ex: await deleteObject(path, objectId)
//this function delete an object in firebase database in specific path. This function has two arguments the first one (path) specify the object in which path in the firebase is  saved,
// for example: deleteObject("reviews",objectId) delete the object under the path of "reviews".
// The second argument is an integer which is identifier of an object, actually it is "objectId" which we mentioned that in the other methods. each object in the firebase has "objectId",
//this function compare the input argument with the "objectId" of all object under the path of "reviews" in the firebase.
// Each object in the database must have a field with the name of "objectId", ex: reviewObj = {objectId:12519, comment:'It is fine',rate:'3'}.
async function deleteObject(path, objectId) {
    if(!path || !objectId)
        return false;
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = await firebase.database().ref().child(path);
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



//for calling all function of this class you must use await keyword before calling ex: await updateObject(path, object)
//this function update an object in firebase database in specific path. This function has two arguments the first one (path) specify the object in which path in the firebase is  saved,
// for example: updateObject("logs",obj) update the object under the path of "logs". The second argument is an object that can have any fields, but "objectId" is mandatory field for the second input argument,
//so each object as an input argument must have a field with the name of "objectId", ex: logObj = {objectId:12519, date:'12232019',action:'update'}.

async function updateObject(path, obj) {
   var deletedFlag =deleteObject(path, obj.objectId);
    if(deletedFlag){
        createObject(path, obj);
    }
}



module.exports = {
    createObject: createObject,
    deleteObject: deleteObject,
    updateObject: updateObject,
    getObjects: getObjects,


};
