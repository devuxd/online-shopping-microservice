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

async function getLogsOfTheUser(userInfo) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    var dataBaseRef = firebase.database().ref().child('Control-condition').child('logs');
    var result=[];
    await dataBaseRef.once("value", function (data) {
        const logs = data.val();

        for (var key in logs) {
            if (logs[key].userId == userInfo.userId) {
                result.push(logs[key]);
            }
        }
    });
    return result;
}

module.exports = {
    getLogsOfTheUser : getLogsOfTheUser

};
