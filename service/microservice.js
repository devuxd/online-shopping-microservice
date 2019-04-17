
var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;


async function yourRecommendations(userInfo) {
    if (!userInfo || !userInfo.userId) {
        throw new TypeError('Illegal Argument Exception');
    }
    var logs = await firebaseUtil.getLogsOfTheUser(userInfo);
    const result=[];
    for(var i=0;i< logs.length ; i++){
        if(logs[i].action==='reviewed'){
            result.push(logs[i]);
        }
    }
    return result;
}



module.exports = {
    yourRecommendations: yourRecommendations
};

